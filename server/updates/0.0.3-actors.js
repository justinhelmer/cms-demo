require('dotenv').load();
const _ = require('lodash');
const fs = require('fs-extra');
const keystone = require('keystone');
const path = require('path');
const config = require('../../config');
const mysql = require('mysql');

module.exports = done => {
  const actorThumbsPath = path.join(config.thumbsPath, 'actor');
  const Actor = keystone.list('actor');
  const Video = keystone.list('video');
  let promises = [];

  const connection = mysql.createConnection({
    host: 'localhost',
    port: '',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  });

  connection.connect(err => {
    if (err) {
      done(err.stack);
    } else {
      fs.readdir(actorThumbsPath)
        .then(results => {
          let promises = [];

          results.forEach(name => {
            promises.push(fs.readdir(path.join(actorThumbsPath, name))
              .then(thumbs => {
                return new Promise((resolve, reject) => {
                  if (!_.isEmpty(thumbs)) {
                    const query = `
                      SELECT     n.title as video
                      FROM       node n 
                      INNER JOIN field_data_field_actors f ON n.nid = f.entity_id
                      INNER JOIN node a on a.nid = f.field_actors_nid
                      WHERE      n.type = 'video'
                      AND        a.title = '` + name + `'
                      ORDER BY   n.title ASC`;

                    connection.query(query, (err, results) => {
                      if (err) {
                        reject(err.stack);
                      } else {
                        let p = [];

                        _.each(results, result => {
                          p.push(Video.model.findOne({ name: result.video }).exec());
                        });

                        Promise.all(p).then(videos => {
                          const actor = { name, thumbs, videos: _.compact(_.map(videos, '_id')) }; 
                          const options = { new: true, upsert: true, setDefaultsOnInsert: true };

                          Actor.model.findOneAndUpdate({ name }, actor, options).exec().then(resolve);
                        });
                      }
                    });
                  } else {
                    resolve();
                  }
                });
              }));
          });

          return Promise.all(promises);
        })
        .then(() => done());
    }
  });

  
}