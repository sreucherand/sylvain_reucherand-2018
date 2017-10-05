const marked = require('marked');

const renderer = new marked.Renderer();

renderer.paragraph = function (text) { return text; };
renderer.link = function (href, title, text) { return `<a href="${href}"${title ? ` title="${title}"` : ''} target="blank">${text}</a>`; };

marked.setOptions({renderer: renderer});

module.exports = Object.assign({}, require('./data'), {
  marked: marked,
  moment: require('moment'),
  nl2br: require('nl2br'),
  url: require('url'),
});
