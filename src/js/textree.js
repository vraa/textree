'use strict';

const NODE_TYPE = {
    FILE: '🗎',
    OPEN_FOLDER: '🗁',
    CLOSED_FOLDER: '🗀'
};

const FILE_SYMBOL = '_';
const NEW_LINE = '\n';
const INDENT = '  ';
const STARTING_DEPTH = 0;

let flags = {
    icons: true
};

let output = '';

function formatName(name, type, isRoot) {
    return (
        (isRoot ? '' : '--')
        + (flags.icons && type ? type : '')
        + ' '
        + name
    );
}

function isAFolder(name) {
    return name.indexOf('.') === -1;
}

function indentation(depth, options) {
    let indent = '';
    let isLastItem = options.isLastItem;
    for (let i = 1; i <= depth; i++) {
        indent += INDENT;
        indent += ( (isLastItem && i === depth) ? '`' : '|');
    }
    return indent;
}

function sortItems(items) {
    let fileSymbolIndex = items.indexOf(FILE_SYMBOL);
    if (fileSymbolIndex != -1) {
        items.splice(fileSymbolIndex, 1);
        items.push(FILE_SYMBOL);
    }
    return items;
}

function parse(node, depth) {

    let childNodeKeys = sortItems(node && Object.keys(node));
    let noOfChildNodes = childNodeKeys.length;
    let i, j;

    for (i = 0; i < noOfChildNodes; i++) {

        let key = childNodeKeys[i];
        let val = node[key];


        if (key === FILE_SYMBOL) {
            for (j = 0; j < val.length; j++) {
                let fileName = val[j];
                let fileIsAFolder = isAFolder(fileName);
                let fileType = fileIsAFolder ? NODE_TYPE.CLOSED_FOLDER : NODE_TYPE.FILE;
                let isLastItem = ((j + 1) === val.length);
                let itemIndentation = indentation(depth, {
                    isLastItem: isLastItem
                });

                output += itemIndentation + formatName(fileName, fileType) + NEW_LINE;
            }

        } else {
            let isRootItem = (depth === 0);
            let itemType = NODE_TYPE.OPEN_FOLDER;
            let isLastItem = ((i + 1) === noOfChildNodes);
            let itemIndentation = indentation(depth, {
                isLastItem: isLastItem
            })
            output += itemIndentation + formatName(key, itemType, isRootItem) + NEW_LINE;

            parse(val, depth + 1);
        }
    }

}

function textree(input) {
    output = '';
    parse(input, STARTING_DEPTH);
    return output;
}

module.exports = textree;