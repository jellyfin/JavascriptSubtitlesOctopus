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

/**
 * Supported render modes.
 */
var SUPPORTED_MODES = ['js-blend', 'wasm-blend', 'lossy'];

/**
 * Generates options according to the passed base options and URL search params.
 * @param {Object} options - Base options.
 * @returns {Object} Options.
 */
function makeOptions(options) {
    var param = new URLSearchParams(window.location.search);

    var renderMode = param.get('renderMode');
    var renderAhead = param.get('renderAhead') || options.renderAhead;

    if (!SUPPORTED_MODES.includes(renderMode)) {
        renderMode = options.renderMode;
    }

    if (renderAhead > 0) {
        // RenderAhead doesn't support other modes
        renderMode = 'wasm-blend';
        // Lock RenderAhead memory
        renderAhead = 90;
    } else {
        renderAhead = 0;
    }

    return Object.assign({}, options, {
        renderMode: renderMode,
        renderAhead: renderAhead
    });
}

/**
 * Returns name of render mode.
 * @param {SubtitleOctopus} octopus - SubtitleOctopus instance.
 * @returns {string} Render mode name.
 */
function getRenderModeName(octopus) {
    var renderAhead = '';

    if (octopus.renderAhead > 0) {
        renderAhead = '+RenderAhead';
    }

    switch (octopus.renderMode) {
        case 'js-blend':
            return 'JSRender' + renderAhead;
        case 'wasm-blend':
            return 'BlendRender' + renderAhead;
        case 'lossy':
            return 'LossyRender' + renderAhead;
    }

    throw 'Unsupported render mode';
}
