const move_all = document.getElementById("move_all");
const move_front = document.getElementById("move_front");
const move_back = document.getElementById("move_back");
const move_checked = document.getElementById("move_checked");

move_all.onclick = () => {
    let from_files = "";
    for (let i = cache.head; i < cache.tail; ++i) {
        const element = cache.elements[i];
        if (exists(element.audio_path)) {
            from_files += "'" + element.audio_path + "' ";
        }
        if (exists(element.image_path)) {
            from_files += "'" + element.image_path + "' ";
        }
    }

    if (exists(from_files)) {
        code_set("cp", from_files + " './collection.media/'");
    }
}

move_front.onclick = () => {
    let from_files = "";
    const element = cache.elements[cache.head];
    if (exists(element.audio_path)) {
        from_files += "'" + element.audio_path + "' ";
    }
    if (exists(element.image_path)) {
        from_files += "'" + element.image_path + "' ";
    }

    if (exists(from_files)) {
        code_set("cp", from_files + " './collection.media/'");
    }
}

move_back.onclick = () => {
    let from_files = "";
    const element = cache.elements[cache.tail - 1];
    if (exists(element.audio_path)) {
        from_files += "'" + element.audio_path + "' ";
    }
    if (exists(element.image_path)) {
        from_files += "'" + element.image_path + "' ";
    }

    if (exists(from_files)) {
        code_set("cp", from_files + " './collection.media/'");
    }
}

move_checked.onclick = () => {
    const checked = get_checked();
    const text_set = {};
    if (checked.length === 0) {
        return;
    }

    for (let i = 0; i < checked.length; ++i) {
        text_set[checked[i].firstChild.textContent] = true;
    }

    let from_files = "";
    for (let i = cache.head; i < cache.tail; ++i) {
        const element = cache.elements[i];
        if (exists(text_set[element.text])) {
            if (exists(element.audio_path)) {
                from_files += "'" + element.audio_path + "' ";
            }
            if (exists(element.image_path)) {
                from_files += "'" + element.image_path + "' ";
            }
        }
    }

    if (exists(from_files)) {
        code_set("cp", from_files + " './collection.media/'");
    }
}
