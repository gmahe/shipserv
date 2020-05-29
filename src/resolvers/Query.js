const Users = require("../data/users");
const departments = require("../data/departments");
const Query = {
  me(_, args, { req, user }) {
    const id = user;
    if (user) {
      return Users.find((user) => user.id === id);
    }
    return null;
  },
  user: (_, { id }, context) => {
    return Users.find((user) => user.id === parseInt(id));

    // const { dataSources } = context;
    // return dataSources.userAPI.getUserById({ userId: id });
    // if (context.user) {
    //   return Users.find((user) => user.id === context.user.id);
    // }
    // return null;
  },
  department(parent, args, context, info) {
    const { id } = args;
    try {
      const department = departments.find((dep) => dep.id === parseInt(id));
      return department;
    } catch (err) {
      throw new Error(err);
    }
  },
  users: (_, __, { dataSources }) => dataSources.userAPI.getAllUsers(),
  // Datasources directly on the 3rd party api endpoint
  // user: (_, { id }, { dataSources }) => {
  //   return dataSources.userAPI.getUserById({ userId: id });
  // },
};
module.exports = Query;
