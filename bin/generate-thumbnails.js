//  node bin/generate-thumbnails
//    --type=video
//    --count=3
//    --offset=0
//    --timemarks=10%
//    --timemarks=20%
//    --timemarks=30%
//    --overwrite

const argv = require('yargs').argv;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

const count = argv.count || 10;
const offset = argv.offset || 0;
const overwrite = argv.overwrite || false;
let timemarks = argv.timemarks || [ '10%' ];
let type = argv.type;
let _cnt = 0;

if (!type) {
  console.error('type is required (photo, video)');
  process.exit(1);
}

if (!Array.isArray(timemarks)) {
  timemarks = [timemarks];
}

const assetPaths = config.assetPaths[type];
let promises = [];

console.log(timemarks);

assetPaths.forEach(assetPath => {
  promises.push(
    fs.readdir(assetPath).then(results => {
      let p = [];

      results.filter(extension).forEach(filename => {
        const name = filename.substring(0, filename.length - 4);
        const list = { name, path: path.join(assetPath, filename) };
        
        if (_cnt >= offset && _cnt < (offset + count)) {
          p.push(generateThumbnails(list));
        }

        _cnt++;
      });

      return Promise.all(p);
    })
  );
});

Promise.all(promises).then(() => console.log('Done creating thumbnails'));

function extension(element) {
  var extName = path.extname(element);
  return extName === '.mp4'; 
};

function generateThumbnails(list) {
  const folder = path.join(config.thumbsPath, type, list.name);

  return new Promise((resolve, reject) => {
    switch (type) {
      case 'video':
        fs.readdir(folder)
          .then(() => {
            overwrite ? generate() : resolve();
          })
          .catch(err => {
            err.code === 'ENOENT' ? generate() : reject(err);
          });
      break;
      default:
      break;
    }

    function generate() {
      ffmpeg(list.path)
        .on('end', () => resolve())
        .thumbnails({ count: 1, timemarks, folder, filename: '%i' });
    }
  });
}