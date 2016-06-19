'use strict';

let textree = require('./src/js/textree');
let walk = require('./src/js/walk');

module.exports = function (folder) {
    if (!!folder) {
        let data = walk(folder, {});
        return textree(data);
    }
}