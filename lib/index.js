const fs = require('fs');
const path = require('path');
const {
  msg,
  colors,
} = require('devbug');
const { convertCssToObject, convertCssToScss } = require('./components/sassParser');


const _readFileContents = filename => fs.readFileSync(filename, 'UTF8');

const _writeFileContents = (filename, contents) => {
  fs.writeFileSync(filename, contents);
};


const cssToObject = cssContent => convertCssToObject(cssContent);


const cssToScss = (cssContent, presets) => convertCssToScss(cssContent, presets);


const processCSSFile = (filename, presets) => {
  const initialContents = _readFileContents(filename);
  const processedContents = cssToScss(initialContents, presets);

  msg('Here')

  const parsedPath = path.parse(filename);
  const newFile = path.format({
    root: parsedPath.root,
    dir: parsedPath.dir,
    ext: '.scss',
    name: `${parsedPath.name}_clean`,
  });

  const newFileNormal = path.normalize(newFile);

  _writeFileContents(newFileNormal, processedContents);

  msg('Succeess', `${newFileNormal} has been successfully created.`, colors.GREEN);
};


module.exports = {
  _readFileContents,
  _writeFileContents,
  cssToObject,
  cssToScss,
  processCSSFile,
};
