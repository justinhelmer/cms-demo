const octicons = require('octicons');

const icons = ['dashboard', 'home'];
let svgs = {};

icons.forEach(icon => {
  svgs[icon] = octicons[icon].toSVG();
});

export default svgs;