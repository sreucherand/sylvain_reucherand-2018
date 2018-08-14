module.exports = `
  type MetaImage {
    Facebook: Image
    Twitter: Image
  }

  type FeedData {
    description: Text
    image: MetaImage
    posts: [Post]
    title: Text
    twitter: String
    url: Url
  }

  type Feed {
    data: FeedData
    id: String!
  }
`;
