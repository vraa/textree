#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const EXCLUSION_LIST = ['.git', 'node_modules', '.sass-cache'];
let textree = require('./js/textree');
let DEFAULT_FOLDER = __dirname;

function _init() {
    let params = _getCliParams();
    let folder = _getFolderToWalk(params);
    let data = _walk(folder, {});
    if(data) {
        console.log(textree(data));
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

function _walk(folder, data) {
    let folderContents = fs.readdirSync(folder);
    let noOfContents = folderContents.length;
    let folderName = path.basename(folder);

    data.name = folderName;
    data.contents = [];

    if (EXCLUSION_LIST.indexOf(folderName) != -1) {
        return data;
    }

    for (let i = 0; i < noOfContents; i++) {
        let content = folderContents[i];
        let contentPath = path.join(folder, content);
        let isFolder = fs.lstatSync(contentPath).isDirectory();
        if (isFolder) {
            data.contents.push(_walk(contentPath, {}));
        } else {
            data.contents.push(content);
        }
    }
    return data;
}

_init();



