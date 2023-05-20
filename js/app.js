const main_input = document.getElementById("main_input");
const audio_input = document.getElementById("audio_input");
const image_input = document.getElementById("image_input");


const clear_cache = document.getElementById("clear_cache");
const pop_back = document.getElementById("pop_back");
const pop_front = document.getElementById("pop_front");
const clear_checked = document.getElementById("clear_checked");

const export_cache = document.getElementById("export_cache");
const import_cache = document.getElementById("import_cache");

const n_cards = document.getElementById("n_cards");

const codebox = document.getElementById("codebox");

const main = document.getElementById("main");
const local_storage = window.localStorage;

const caches = {"current": 0, "cache": [new Queue(cache_contents()), new Queue()]};
let cache = caches.cache[0];

if (!exists(cache)) {
    cache = new Queue();
}

main_input.autofocus = true;
export_cache.href = export_cache_encode(cache_contents_raw());


function cards_remove() {
    while(main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function cards_redraw() {
    cards_remove();
    cards_draw();
}

function cards_draw() {
    // Add items from cache.
    for (let i = cache.head; i < cache.tail; ++i) {
        const element = cache.elements[i];
        new_card(element.text, element.content, element.image_path, element.audio_path);
    }
}

cards_draw();


audio_input.onkeydown = submit_onenter;
image_input.onkeydown = submit_onenter;
main_input.onkeydown = submit_onenter;

document.onkeypress = (e) => {
    if (e.charCode === 105) {
        reset_window();
    }
};

reset_window();

function add_note_from_inputs() {
    const main_value = main_input.value;
    if (main_value.length === 0) {
        return;
    }

    let audio_value = audio_input.value;
    let image_value = image_input.value;
    let audio_path = audio_input.value;
    let image_path = image_input.value;

    if (audio_value.length !== 0) {
        audio_value = "[sound:" + audio_value + "]";
        audio_path = "./media/" + audio_input.value;
    }

    if (image_value.length !== 0) {
        image_value = "<img src=\"" + image_value + "\">";
        image_path = "./media/" + image_input.value;
    }

    const text = main_input.value;
    const content = main_input.value + ";" + audio_value + ";" + image_value;

    // Add value to local storage.
    cache_enqueue(text, content, image_path, audio_path);

    // Add value to DOM.
    new_card(text, content, image_path, audio_path);

    reset_input();
}

clear_cache.onclick = () => {
    if (confirm("Are you sure you want to clear the cache?")) {
        cache_clear();

        // Remove every para.
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    }
};

// Get reference to alternate cache.
function cache_get_alternate() {
    return caches.cache[!caches.current | 0];
}

function cache_alternate() {
    caches.current = !caches.current | 0;
    cache = caches.cache[caches.current];
}

clear_checked.onclick = () => {
    const checked = get_checked();
    const text_set = {};
    if (checked.length === 0) {
        return;
    }

    const cache_new = cache_get_alternate();
    cache_new.clear()

    for (let i = 0; i < checked.length; ++i) {
        text_set[checked[i].firstChild.textContent] = true;
        main.removeChild(checked[i]);
    }

    for (let i = cache.head; i < cache.tail; ++i) {
        if (!exists(text_set[cache.elements[i].text])) {
            cache_new.enqueue(cache.elements[i]);
        }
    }

    cache_alternate();
    cache_write();
    update_card_count();
};

pop_back.onclick = () => {
    // TODO Remove card function/abstraction?
    if (cache_dequeue_back()) {
        main.removeChild(main.lastChild);
        update_card_count();
    }
};

pop_front.onclick = () => {
    if (cache_dequeue()) {
        main.removeChild(main.firstChild);
        update_card_count();
    }
};

function codebox_content() {
    const inner_text = codebox.children[0].innerText
    return inner_text.substring(2, inner_text.length);
}

codebox.onclick = () => {
    navigator.clipboard.writeText(codebox_content());
    alert("Copied command to clipboard");
}

import_cache.oninput = (e) => {
    if (confirm("This will overwrite your current cache: Are you sure you want to do this?")) {
        //console.log(e);
        const file_promise = Promise.resolve(import_cache.files[0].text());
        file_promise.then((text) => {
            const import_json = JSON.parse(unicode_decode_b64(text));
            console.log(import_json);

            const cache_new = cache_get_alternate();

            cache_new.elements = import_json.elements;
            cache_new.head = import_json.head;
            cache_new.tail = import_json.tail;

            cache_alternate();
            cache_write();
            cards_redraw();
        });
    }
}
