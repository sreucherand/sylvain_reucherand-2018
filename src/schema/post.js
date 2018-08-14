module.exports = `
  interface Post {
    id: String!
    type: String!
  }

  type NewsData {
    date: String
    title: Text
  }

  type News implements Post {
    data: NewsData
    id: String!
    type: String!
  }

  type ProjectData {
    date: String
    description: [Text]
    gallery: [Media]
    title: Text
  }

  type Project implements Post {
    data: ProjectData
    id: String!
    metadata: [Metadata]
    title: String
    type: String!
  }
`;
