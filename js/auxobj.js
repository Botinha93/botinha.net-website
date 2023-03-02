/**
 * @typedef {axu} axu
 */
const aux = {
    /**
     * @function readTextFile
     * @param {String} file
     * @callback callback(rawFile.responseText)
     */
    readTextFile = function (file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
}
