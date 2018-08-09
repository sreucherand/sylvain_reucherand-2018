const express = require('express');
const graphqlHTTP = require('express-graphql');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const resolvers = require('../resolvers/resolvers');
const types = require('../schema/types');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({
      resolvers: resolvers,
      typeDefs: types,
    }),
    graphiql: true,
  })
);

app.listen(4000);
