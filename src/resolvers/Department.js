const Users = require("../data/users");

const users = (department) => {
  const ids = department.users;
  const userResult = ids.map((id) => {
    return Users.find((user) => {
      if (user.id === parseInt(id)) {
      }
      return user.id === parseInt(id);
    });
  });
  return userResult;
};

module.exports = {
  users,
};
