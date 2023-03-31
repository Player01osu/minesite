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

    return parent;
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


function new_card(text, content, image_path, audio_path) {
    const card_div = new_div(main, null, "card");
    const para = new_para(card_div, text);
    const copy_button = new_button(card_div, "copy", () => navigator.clipboard.writeText(content));

    if (exists(image_path)) {
        const image_button = new_button(card_div, "image", () => {
            const img_id = "img" + image_path;
            let img = document.getElementById(img_id);

            if (exists(img)) {
                card_div.removeChild(img);
            } else {
                img = document.createElement("img");
                img.src = image_path;

                const img_div = document.createElement("div");
                img_div.className = "images";
                img_div.id = img_id;
                img_div.appendChild(img);
                card_div.appendChild(img_div);
            }
        });
    }

    const check = new_input(card_div, "checkbox");
    check.className = "pop_mark";

    if (exists(audio_path)) {
        const audio = new_audio(card_div, audio_path);
    }

    return card_div;
}

function cache_write() {
    const encoded_cache = b64_encode_unicode(JSON.stringify(cache));

    export_cache.href = export_cache_encode(encoded_cache);
    local_storage.setItem("cache", encoded_cache);
}

function cache_enqueue(text, content, image_path, audio_path) {
    cache.enqueue({"text": text, "content": content, "image_path": image_path, "audio_path": audio_path});
    cache_write();
}

function cache_dequeue() {
    if (cache.dequeue() !== null) {
        cache_write();
        return true;
    }
    return false;
}

function cache_dequeue_back() {
    if (cache.dequeue_back() !== null) {
        cache_write();
        return true;
    }
    return false;
}

function cache_clear() {
    cache = new Queue();
    local_storage.clear();
    cache_write();
}

function cache_contents_raw() {
    return local_storage.getItem("cache");
}

function cache_contents() {
    const cache_raw = cache_contents_raw();
    if (cache_raw === null) {
        return null;
    }
    return JSON.parse(unicode_decode_b64(cache_raw));
}


function b64_encode_unicode(str) {
  return btoa(encodeURIComponent(str));
}

function unicode_decode_b64(str) {
  return decodeURIComponent(atob(str));
}

function export_cache_encode(encoded_cache) {
    return "data:application/json;," + encoded_cache;
}
