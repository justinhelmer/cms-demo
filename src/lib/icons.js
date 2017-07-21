const octicons = require('octicons');

const icons = ['dashboard', 'home'];
let svgs = {};

Object.keys(octicons).forEach(icon => {
  svgs[icon] = octicons[icon].toSVG();
});

export default svgs;