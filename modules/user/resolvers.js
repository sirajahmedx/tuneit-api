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

  updateCustomer: async (parent, args, context, info) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await UserService.updateCustomer(args);
    } catch (error) {
      return {
        success: false,
        message: error.message || "An error occurred while updating the user",
      };
    }
  },
  createMechanic: async (parent, args, context, info) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await UserService.createMechanic(args);
    } catch (error) {
      return {
        success: false,
        message:
          error.message || "An error occurred while creating the mechanic",
      };
    }
  },
  updateMechanic: async (parent, args, context, info) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await UserService.updateMechanic(args);
    } catch (error) {
      return {
        success: false,
        message: error.message || "An error occurred while updating the user",
      };
    }
  },

  signIn: async (parent, args, context, info) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await UserService.signIn(args);
    } catch (error) {
      return {
        success: false,
        message: error.message || "An error occurred during sign in",
      };
    }
  },

  googleAuth: async (parent, args, context, info) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await UserService.googleAuth(args);
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

module.exports.resolvers = {
  queries,
  mutations,
};
