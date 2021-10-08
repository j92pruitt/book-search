const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { gqlAuthMiddleware } = require('./utils/auth')

const app = express();
const PORT = process.env.PORT || 3001;

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Add context to our server so data from the `authMiddleware()` function can pass data to our resolver functions
  context: ( {req} ) => {
    let token = req.headers.authorization || '';

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration});
      req.user = data;
    } catch(err) {
      console.error(err)
    }

    return req
  },
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);

    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  });
});
