//  node bin/generate-thumbs
//    --type=video
//    --count=3
//    --offset=0
//    --overwrite

const argv = require('yargs').argv;
const easyimg = require('easyimage');
const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

const count = argv.count || 10000;
const offset = argv.offset || 0;
const overwrite = argv.overwrite || false;
let type = argv.type;
let _cnt = 0;

if (!type) {
  console.error('type is required (photo, video)');
  process.exit(1);
}

const assetPaths = config.assetPaths[type];
let promises = [];

assetPaths.forEach(assetPath => {
  promises.push(
    fs.readdir(assetPath).then(results => {
      let p = [];

      results.filter(extension).forEach(filename => {
        const name = filename.substring(0, filename.length - 4);
        const list = { name, path: path.join(assetPath, filename) };
        
        if (_cnt >= offset && _cnt < (offset + count)) {
          p.push(generateThumbs(list));
        }

        _cnt++;
      });

      return Promise.all(p);
    })
  );
});

Promise.all(promises).then(() => console.log('Done creating thumbs'));

function extension(element) {
  var extName = path.extname(element);
  return extName === '.mp4'; 
};

function generateThumbs(list) {
  const screensFolder = path.join(config.screensPath, type, list.name);
  const thumbsFolder = path.join(config.thumbsPath, type, list.name);

  return fs.readdir(thumbsFolder)
      .then(() => {
        return overwrite ? generate() : Promise.resolve();
      })
      .catch(err => {
        return err.code === 'ENOENT' ? generate() : Promise.reject(err);
      });

  function generate() {
    switch (type) {
      case 'video':
        return easyimg.rescrop({
          src: path.join(screensFolder, '1.png'),
          dst: path.join(thumbsFolder, '1.jpg'),
          width: 640,
          height: 360,
          fill: true,
          x: 0,
          y: 0
        });
      break;
      default:
      break;
    }
  }
}