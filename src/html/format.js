import escapeHtml from 'escape-html';
import PrismicRichText from 'prismic-richtext';

export default text => {
  const serialize = (type, element, content, children) => {
    switch (type) {
      case PrismicRichText.Elements.em:
      case PrismicRichText.Elements.strong:
        return `<${type}>${children.join('')}</${type}>`;

      case PrismicRichText.Elements.hyperlink:
        if (element.data.link_type === 'Web') {
          return `<a href="${element.data.url}"${
            element.data.target
              ? ` target="${element.data.target}" rel="noopener"`
              : ''
          }>${children.join('')}</a>`;
        }

        return '';

      case PrismicRichText.Elements.span:
        return content ? escapeHtml(content).replace(/\n/g, '<br />') : '';

      default:
        return children.join('');
    }
  };

  return PrismicRichText.serialize([].concat(text), serialize).join('');
};
