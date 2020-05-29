const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const resolvers = require("./src/resolvers/index");

const { IsAuthenticatedDirective } = require("./src/directive");

const PRIVATE_KEY = require("./src/config/keys");

const { UserAPI } = require("./src/datasources/user");
const typeDefs = fs.readFileSync(
  path.join(__dirname, "./src/schema/schema.graphql"),
  "utf8"
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ userAPI: new UserAPI() }),
  context: ({ req }) => {
    const token = req.headers.authorization;
    if (token) {
      try {
        const id_token = token.replace("Bearer ", "");
        const decoded = jwt.verify(id_token, PRIVATE_KEY);
        return { req, user: decoded.id };
      } catch (err) {
        return { req };
      }
    }
    return { req };
  },
  introspection: true,
  playground: true,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
