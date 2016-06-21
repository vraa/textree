#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

let _walk = require('./js/walk');
let textree = require('./js/textree');
let DEFAULT_FOLDER = process.cwd();

function _init() {
    let params = _getCliParams();
    let folder = _getFolderToWalk(params);
    if (fs.lstatSync(folder).isDirectory()) {
        let data = _walk(folder, {});
        if (data) {
            console.log(textree(data));
        }
    } else {
        _usage(folder);
        process.exit();
    }

}

function _getCliParams() {
    let params = [];
    let args = process.argv;
    for (let arg = 0; arg < args.length; arg++) {
        if (arg > 1) {
            params.push(args[arg]);
        }
    }
    return params;
}

function _getFolderToWalk(params) {
    let folder;
    if (params && params.length > 0) {
        folder = params[0];
    }
    return folder || DEFAULT_FOLDER;
}


function _usage(input) {
    console.log('"' + input + '" is not a directory. Exiting.');
}

_init();



