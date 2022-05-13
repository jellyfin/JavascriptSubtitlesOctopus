/**
 * Returns base URL.
 * @returns {string} Base URL.
 */
 function getBaseUrl() {
    var pathname = window.location.pathname;

    var pos = pathname.lastIndexOf('/');

    if (pos !== -1) {
        pathname = pathname.slice(0, pos);
    }

    return window.location.origin + pathname;
}
