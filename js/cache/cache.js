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
    cache.clear();
    update_card_count();
    local_storage.setItem("cache", null);
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
