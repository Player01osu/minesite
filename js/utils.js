function get_checked() {
    // Get all divs with class "card".
    const cards = document.getElementsByClassName("card");
    const checked_array = [];
    // Iterate through divs.
    for (let i = 0; i < cards.length; ++i) {
        // If it's checkmark is true, append div to checked_array.
        if (cards[i].getElementsByClassName("pop_mark")[0].checked) {
            checked_array.push(cards[i]);
        }
    }

    return checked_array;
}

function exists(item) {
    return item !== null && item !== undefined && item !== "";
}

function new_audio(parent, src, type) {
    if (!exists(type)) {
        type = "audio/mpeg";
    }

    const audio = document.createElement("audio");
    audio.controls = true;

    const source = document.createElement("source");
    source.type = type;
    source.src = src;
    audio.appendChild(source);

    parent.appendChild(audio);
}

function new_para(parent, text) {
    const para = document.createElement("p");
    const node = document.createTextNode(text);
    para.appendChild(node);

    parent.appendChild(para);
    return para;
}

function new_button(parent, text, onclick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.onclick = onclick;
    parent.appendChild(button);

    return button;
}

function new_input(parent, type) {
    const input = document.createElement("input");
    input.type = type;
    parent.appendChild(input);

    return input;
}

function new_div(parent, id, class_name) {
    const div = document.createElement("div");
    if (exists(class_name)) {
        div.className = class_name;
    }
    if (exists(id)) {
        div.id = id;
    }

    parent.appendChild(div);
    return div;
}

function toggle_hidden(element) {
    element.hidden = !element.hidden;
}

function new_card(text, content, image_path, audio_path) {
    const card_div = new_div(main, null, "card");
    const para = new_para(card_div, text);
    const copy_button = new_button(card_div, "copy", () => navigator.clipboard.writeText(content));
    copy_button.className = "card_button";

    if (exists(image_path)) {
        const image_button = new_button(card_div, "image", () => {
            const img_id = "img" + image_path;
            let img_div = document.getElementById(img_id);

            if (exists(img_div)) {
                toggle_hidden(img_div);
            } else {
                img_div = document.createElement("div");
                const img = document.createElement("img");
                img.src = image_path;
                img.onclick = () => img_div.hidden = true;

                img_div.className = "images";
                img_div.id = img_id;
                img_div.appendChild(img);
                card_div.appendChild(img_div);
            }
        });

        image_button.className = "card_button";
    }

    const check = new_input(card_div, "checkbox");
    check.className = "pop_mark";

    if (exists(audio_path)) {
        const audio = new_audio(card_div, audio_path);
    }

    return card_div;
}

function submit_onenter(e) {
    switch (e.keyCode) {
        case 16:
        case 17:
            return;
        case 13:
            add_note_from_inputs();
        default:
            window.scrollTo(0, document.body.scrollHeight);
            break;
    }
}

function reset_window() {
    window.scrollTo(0, document.body.scrollHeight);
    main_input.focus();
}

function reset_input() {
    reset_window();

    main_input.value = "";
    audio_input.value = "";
    image_input.value = "";
}

