function b64_encode_unicode(str) {
  return btoa(encodeURIComponent(str));
}

function unicode_decode_b64(str) {
  return decodeURIComponent(atob(str));
}

function export_cache_encode(encoded_cache) {
    return "data:application/json;," + encoded_cache;
}
