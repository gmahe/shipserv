const { SchemaDirectiveVisitor } = require("graphql-tools");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = require("../config/keys");

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.resolve = async function (result, args, { req }, info) {
      if (!req || !req.headers || !req.headers.authorization) {
        return null;
      }
      const token = req.headers.authorization;
      try {
        const id_token = token.replace("Bearer ", "");
        jwt.verify(id_token, PRIVATE_KEY);
        return result[field.name];
      } catch (err) {
        return null;
      }
    };
  }
}

module.exports = { IsAuthenticatedDirective };
