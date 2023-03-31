const main_input = document.getElementById("main_input");
const audio_input = document.getElementById("audio_input");
const image_input = document.getElementById("image_input");

const clear_cache = document.getElementById("clear_cache");
const pop_back = document.getElementById("pop_back");
const pop_front = document.getElementById("pop_front");
const clear_checked = document.getElementById("clear_checked");
const export_cache = document.getElementById("export_cache");

const codebox = document.getElementById("codebox");

const main = document.getElementById("main");
const local_storage = window.localStorage;

let cache = new Queue(cache_contents());
let cache_alt = new Queue();
// TODO
let cache_ptr = cache;

if (cache === null) {
    cache = new Queue();
}

main_input.autofocus = true;
export_cache.href = export_cache_encode(cache_contents_raw());

// Add items from cache.
for (let i = cache.head; i < cache.tail; ++i) {
    const element = cache.elements[i];
    new_card(element.text, element.content, element.image_path, element.audio_path);
}

audio_input.onkeydown = submit_onenter;
image_input.onkeydown = submit_onenter;
main_input.onkeydown = submit_onenter;

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
    cache_clear();

    // Remove every para.
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
};

clear_checked.onclick = () => {
    const checked = get_checked();
    const text_array = {};

    if (checked.length === 0) {
        return;
    }

    for (let i = 0; i < checked.length; ++i) {
        text_array[checked[i].firstChild.textContent] = true;
        main.removeChild(checked[i]);
    }

    for (let i = cache.head; i < cache.tail; ++i) {
        if (text_array[cache.elements[i].text] === undefined) {
            cache_alt.enqueue(cache.elements[i]);
        }
    }

    cache = cache_alt;
    cache_write();
};

pop_back.onclick = () => {
    if (cache_dequeue_back()) {
        main.removeChild(main.lastChild);
    }
};

pop_front.onclick = () => {
    if (cache_dequeue()) {
        main.removeChild(main.firstChild);
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
