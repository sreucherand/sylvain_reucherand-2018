const marked = require('marked');

const renderer = new marked.Renderer();

renderer.paragraph = function (text) { return text; };

marked.setOptions({renderer: renderer});

module.exports = Object.assign({}, require('./data'), {
  marked: marked,
  moment: require('moment'),
  nl2br: require('nl2br'),
});
