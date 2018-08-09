module.exports = `
  interface Metadata {
    type: String!
  }

  type MetadataDateData {
    title: Text
    date: String
  }

  type MetadataDate implements Metadata {
    data: MetadataDateData
    type: String!
  }

  type MetadataLinkData {
    links: [Link]
    title: Text
  }

  type MetadataLink implements Metadata {
    data: MetadataLinkData
    type: String!
  }

  type MetadataTextData {
    items: [Text]
    title: Text
  }

  type MetadataText implements Metadata {
    data: MetadataTextData
    type: String!
  }
`;
