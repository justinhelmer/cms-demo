const fs = require('fs-extra');
const keystone = require('keystone');
const path = require('path');
const config = require('../../config');

module.exports = done => {
  let promises = [];

  Object.keys(config.assetPaths).forEach(list => {
    promises.push(updateList(list).then(() => generateThumbs(list)));
  });

  Promise.all(promises).then(() => done()).catch(err => done);
  
  function extension(element) {
    var extName = path.extname(element);
    return extName === '.mp4'; 
  };

  function updateList(list) {
    const assetPaths = config.assetPaths[list];
    const List = keystone.list(list);
    let promises = [];

    assetPaths.forEach(assetPath => {
      promises.push(
        fs.readdir(assetPath)
          .then(results => {
            let p = [];

            results.filter(extension).forEach(filename => {
              const name = filename.substring(0, filename.length - 4);
              const props = { name, path: path.join(assetPath, filename) };
              const options = { new: true, upsert: true, setDefaultsOnInsert: true };
              
              p.push(List.model.findOneAndUpdate({ name }, props, options).exec());
            });

            return Promise.all(p);
          })
        );
    });

    return Promise.all(promises);
  }

  function generateThumbs(list) {
    switch (list) {
      case 'video':

      break;
      default:
      break;
    }
    
    return Promise.resolve();
  }
}