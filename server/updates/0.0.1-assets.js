const fs = require('fs-extra');
const keystone = require('keystone');
const path = require('path');
const config = require('../../config');

module.exports = done => {
  let promises = [];

  Object.keys(config.assetPaths).forEach(type => {
    promises.push(updateList(type));
  });

  Promise.all(promises)
    .then(() => done())
    .catch(err => done(err.stack));

  function extension(element) {
    var extName = path.extname(element);
    return extName === '.mp4'; 
  };

  function updateList(type) {
    const assetPaths = config.assetPaths[type];
    const List = keystone.list(type);
    let promises = [];

    assetPaths.forEach(assetPath => {
      promises.push(
        fs.readdir(assetPath)
          .then(results => {
            let p = [];

            results.filter(extension).forEach(filename => {
              const name = filename.substring(0, filename.length - 4);
              const list = { name, path: path.join(assetPath, filename) };
              const options = { new: true, upsert: true, setDefaultsOnInsert: true };
              
              p.push(
                List.model
                  .findOneAndUpdate({ name }, list, options)
                  .exec()
              );
            });

            return Promise.all(p);
          })
        );
    });

    return Promise.all(promises);
  }
}