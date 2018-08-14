module.exports = [
  `
  ${require('./feed')}
  ${require('./fields')}
  ${require('./file')}
  ${require('./metadata')}
  ${require('./post')}

  type Query {
    feed: Feed
  }

  schema {
    query: Query
  }
`,
];
