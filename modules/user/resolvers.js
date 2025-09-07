const { UserService } = require("./service");

const queries = {};

const mutations = {
  createCustomer: async (parent, args, context, info) => {
    try {
      if (!args.input) {
        return {
          success: false,
          message: "Input is required",
        };
      }

      const input = {
        ...args.input,
        role: "user",
      };

      const response = await UserService.createCustomer(input);

      if (!response) {
        return {
          success: false,
          message: "No response from service",
        };
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message:
          error.message || "An error occurred while creating the customer",
      };
    }
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
