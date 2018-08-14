module.exports = `
  type Link {
    link: Url
    title: Text
  }

  type Url {
    target: String
    url: String
  }

  type Media {
    caption: Text
    media: File
  }

  type Text {
    html: String
    text: String
  }
`;
