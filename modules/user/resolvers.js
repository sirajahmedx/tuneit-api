const { UserService } = require("./service");

const queries = {};

const mutations = {
  createCustomer: async (parent, args, context, info) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await UserService.createCustomer(args.input);
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
