'use strict';

const ITEM_TYPE = {
    FILE: '🗎',
    OPEN_FOLDER: '🗁',
    CLOSED_FOLDER: '🗀'
};
const FILE_SYMBOL = '_';
const NEW_LINE = '\n';
const INDENT = '  ';
const STARTING_DEPTH = 0;
const DEFAULT_OPTIONS = {
    icons: true,
    style: 1
}

let Textree = {

    input: '',
    output: '',


    textree: function (input, options) {
        Textree._init(input, options);
        Textree._parse(input, STARTING_DEPTH);
        return Textree.output;
    },

    _init: function (input, options) {
        Textree.output = '';
        Textree.input = input;
        Textree.options = options || DEFAULT_OPTIONS;
    },

    _parse: function (folder, depth) {
        let folderContents = Textree._sortFolder(Object.keys(folder));
        let noOfItemsInFolder = folderContents.length;
        let i, j;

        for (i = 0; i < noOfItemsInFolder; i++) {

            let key = folderContents[i];
            let val = folder[key];

            if (key === FILE_SYMBOL) {
                Textree._sortFiles(val);
                for (j = 0; j < val.length; j++) {
                    let fileName = val[j];
                    let fileIsAFolder = Textree._isAFolder(fileName);
                    let fileType = fileIsAFolder ? ITEM_TYPE.CLOSED_FOLDER : ITEM_TYPE.FILE;
                    let isLastItem = ((j + 1) === val.length);
                    let itemIndentation = Textree._indentation(depth, {
                        isLastItem: isLastItem
                    });

                    Textree.output += itemIndentation + Textree._formatName(fileName, fileType) + NEW_LINE;
                }

            } else {
                let isRootItem = (depth === 0);
                let itemType = ITEM_TYPE.OPEN_FOLDER;
                let isLastItem = ((i + 1) === noOfItemsInFolder);
                let itemIndentation = Textree._indentation(depth, {
                    isLastItem: isLastItem
                })
                Textree.output += itemIndentation + Textree._formatName(key, itemType, isRootItem) + NEW_LINE;
                Textree._parse(val, depth + 1);
            }
        }

    },

    _sortFolder: function (contents) {
        let fileSymbolIndex = contents.indexOf(FILE_SYMBOL);
        if (fileSymbolIndex != -1) {
            contents.splice(fileSymbolIndex, 1);
            contents.sort();
            contents.push(FILE_SYMBOL);
        }
        return contents;
    },

    _sortFiles: function (files) {
        let isAFolder = Textree._isAFolder;
        return files.sort(function (a, b) {
            if (isAFolder(a) && isAFolder(b)) {
                return a.localeCompare(b);
            } else if (isAFolder(a) && !isAFolder(b)) {
                return -1;
            } else if (!isAFolder(a) && isAFolder(b)) {
                return 1;
            } else {
                return a.localeCompare(b);
            }
        });
    },

    _formatName: function (name, type, isRoot) {
        let options = Textree.options;
        return (
            (isRoot ? '' : '--')
            + (options.icons && type ? type : '')
            + ' '
            + name
        );
    },

    _isAFolder: function (name) {
        return name.indexOf('.') === -1;
    },

    _indentation: function (depth, options) {
        let indent = '';
        let isLastItem = options.isLastItem;
        for (let i = 1; i <= depth; i++) {
            indent += INDENT;
            indent += ( (isLastItem && i === depth) ? '`' : '|');
        }
        return indent;
    },


};

module.exports = Textree.textree;