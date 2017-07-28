function globalEvents() {
  let events = {};

  return {
    on: (name, cb) => {
      if (!events[name]) {
        events[name] = [];
      }

      events[name].push(cb);
    },

    trigger: (name, data) => {
      if (events[name]) {
        events[name].forEach(cb => cb(data));
      }
    }
  };  
}

export default globalEvents();