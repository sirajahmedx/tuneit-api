import { service } from "./service";

const queries = {};

const mutations = {
  createCustomer: async (parent:any, args: { input: any }, context: any, info: any) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await service.createCustomer(args.input);
    } catch (error:any) {
      return {
        success: false,
        message:
          error.message || "An error occurred while creating the customer",
      };
    }
  },

  updateCustomer: async (parent:any, args: { input: any }, context: any, info: any) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await service.updateCustomer(args);
    } catch (error:any) {
      return {
        success: false,
        message: error.message || "An error occurred while updating the user",
      };
    }
  },
  createMechanic: async (parent:any, args: { input: any }, context: any, info: any) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await service.createMechanic(args);
    } catch (error:any) {
      return {
        success: false,
        message:
          error.message || "An error occurred while creating the mechanic",
      };
    }
  },
  updateMechanic: async (parent:any, args: { input: any }, context: any, info: any) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await service.updateMechanic(args);
    } catch (error:any) {
      return {
        success: false,
        message: error.message || "An error occurred while updating the user",
      };
    }
  },

  signIn: async (parent:any, args: { input: any }, context: any, info: any) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await service.signIn(args);
    } catch (error:any) {
      return {
        success: false,
        message: error.message || "An error occurred during sign in",
      };
    }
  },

  googleAuth: async (parent:any, args: { input: any }, context: any, info: any) => {
    try {
      if (!args.input) {
        throw new Error("Input is required");
      }

      return await service.googleAuth(args);
    } catch (error:any) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

export const resolvers = { queries, mutations };
