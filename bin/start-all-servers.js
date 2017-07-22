const forever = require('forever-monitor');
const path = require('path');
let processes = {};

processes.db = forever.start(['mongod'], {
  max: 1,
  silent: false
});

processes.server = new (forever.Monitor)(path.resolve(__dirname, '../server/index.js'), {
  max: 1
});

processes.db.on('exit', function () {
  if (processes.server.running) {
    processes.server.stop();
  }
});

processes.server.on('exit', function () {
  if (processes.db.running) {
    processes.db.stop();
  }
});

processes.server.start();