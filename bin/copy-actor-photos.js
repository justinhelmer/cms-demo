//  node bin/copy-actor-photos

require('dotenv').load();
const _ = require('lodash');
const argv = require('yargs').argv;
const fs = require('fs-extra');
const mysql = require('mysql');
const path = require('path');
const config = require('../config');

const overwrite = argv.overwrite || false;

const connection = mysql.createConnection({
  host: 'localhost',
  port: '',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
});

connect()
  .then(getPhotos)
  .then(copyPhotos)
  .then(() => connection.end())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

function connect() {
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        reject(err.stack);
      } else {
        resolve();
      }
    });
  });
}

function getPhotos() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT     n.title, f.filename
      FROM       node n
      INNER JOIN field_data_field_actor_photos p ON n.nid = p.entity_id
      INNER JOIN file_managed f ON p.field_actor_photos_fid = f.fid
      WHERE      n.type = 'actor'
      ORDER BY   n.title ASC`;

    connection.query(query, (err, results) => {
      if (err) {
        reject(err.stack);
      } else {
        resolve(results);
      }
    });
  });
}

function copyPhotos(results) {
  let promises = [];

  const grouped = _.groupBy(results, 'title');
  const assetPath = config.assetPaths.actor;

  Object.keys(grouped).forEach(actor => {
    const resultGroup = grouped[actor];
    let cnt = 1;

    _.each(resultGroup, result => {
      const src = path.join(assetPath, result.filename);
      const dest = path.join(config.thumbsPath, 'actor', result.title.replace(/ \/ /g, ', '), cnt + path.extname(result.filename));

      promises.push(
        fs.copy(src, dest).catch(err => {
          console.log(err); // if file doesnt copy just continue
        })
      );

      if (argv.debug) {
        console.log('SRC', src);
        console.log('DEST', dest);
        console.log('-------------------');
      }

      cnt++;
    });
  });

  return Promise.all(promises);
}