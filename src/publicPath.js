/* global __webpack_public_path__:writable */

/*
 * Setting webpack's public path dynamically instead of statically at the compilation process.
 * This allows users of the library to be able to host JS main bundle and its chunks anywhere they
 * like as long as all js files are in the same directory. Setting path dynamically allows entry .html
 * file to live separately from JS bundle files which is required for CDN/CMS deployments of
 * Mapbuilder.
 * https://webpack.js.org/guides/public-path/
 *
 * */
//@ts-ignore
const url = new URL(document.currentScript.src);
const widgetLink = url.href.substring(0, url.href.lastIndexOf('/') + 1);
//@ts-ignore
__webpack_public_path__ = widgetLink;
console.log(__webpack_public_path__);