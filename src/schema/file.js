module.exports = `
  interface File {
    url: String
  }

  type Document implements File {
    kind: String!
    url: String
  }

  type Image implements File {
    base64: String
    height: String
    kind: String!
    size: String
    url: String
    width: String
  }

  type Video implements File {
    base64: String
    kind: String!
    url: String
  }
`;
