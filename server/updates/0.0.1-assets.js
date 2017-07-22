const fs = require('fs-extra');
const keystone = require('keystone');
const path = require('path');
const config = require('../../config');

module.exports = done => {
  Object.keys(config.assetPaths).forEach(list => {
    const List = keystone.list(list);
    let promises = [];

    config.assetPaths[list].forEach(assetPath => {
      let results = fs.readdirSync(assetPath);

      results.filter(extension).forEach(filename => {
        const name = filename.substring(0, filename.length - 4);
        const props = { name, path: path.join(assetPath, filename) };
        const options = { new: true, upsert: true, setDefaultsOnInsert: true };
        
        promises.push(List.model.findOneAndUpdate({ name }, props, options).exec());
      });
    });

    return Promise.all(promises).then(() => done());
  });
  
  function extension(element) {
    var extName = path.extname(element);
    return extName === '.mp4'; 
  };
}