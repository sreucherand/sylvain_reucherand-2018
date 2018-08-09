module.exports = `
  type FeedData {
    description: Text
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
