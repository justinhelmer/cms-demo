const _ = require('lodash');
const fs = require('fs-extra');
const keystone = require('keystone');
const path = require('path');
const config = require('../../config');

module.exports = done => {
  const actorThumbsPath = path.join(config.thumbsPath, 'actor');
  const Actor = keystone.list('actor');
  let promises = [];

  fs.readdir(actorThumbsPath)
    .then(results => {
      let promises = [];

      results.forEach(name => {
        promises.push(fs.readdir(path.join(actorThumbsPath, name))
          .then(thumbs => {
            if (!_.isEmpty(thumbs)) {
              const actor = { name, thumbs }; 
              const options = { new: true, upsert: true, setDefaultsOnInsert: true };

              return Actor.model.findOneAndUpdate({ name }, actor, options).exec();
            }
          }));
      });

      return Promise.all(promises);
    })
    .then(() => done());
}