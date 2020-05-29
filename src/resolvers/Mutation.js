const jwt = require("jsonwebtoken");
const PRIVATE_KEY = require("../config/keys");
const accounts = require("../data/accounts");
// const Departments = require("../data/departments");
// const Users = require("../data/users");

const Mutation = {
  login(_, { email, password }, context) {
    const user = accounts.find(
      (account) => account.email === email && account.password === password
    );

    if (!user) throw new Error("Unable to Login");
    // TODO
    // We should have an encrypted password.
    const { id, permissions, roles } = user;
    const token = jwt.sign(
      { id, email, graphql: { roles, permissions } },
      PRIVATE_KEY,
      {
        algorithm: "HS256",
        subject: "whatever",
        expiresIn: "1d",
      }
    );

    return token;
  },
};
module.exports = Mutation;
