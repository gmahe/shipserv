const { RESTDataSource } = require("apollo-datasource-rest");

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = " https://jsonplaceholder.typicode.com/";
  }

  userReducer(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      // We don't get the rest because we don't need it at the moment.
    };
  }

  async getAllUsers() {
    const response = await this.get("users");
    return Array.isArray(response)
      ? response.map((user) => this.userReducer(user))
      : [];
  }

  async getUserById({ userId }) {
    // Ignore userId above 10 do not return anything on the endpoint, neither 404, it just keeps waiting.
    const response = await this.get(`users/${userId}`);
    return this.userReducer(response);
  }
}

module.exports = { UserAPI };
