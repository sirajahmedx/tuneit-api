const { ServiceDataSource } = require("./service");
const queries = {
  getAllServices: async (parent, args, context, info) => {
    try {
      return await ServiceDataSource.getAllServices(args);
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },

  getServiceById: async (parent, args, context, info) => {
    try {
      if (!args) throw new Error("Invalid arguments");
      if (!args.id) throw new Error("Service ID is required");
      return await ServiceDataSource.getServiceById(args.id);
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
};

const mutations = {
  createService: async (parent, args, context, info) => {
    try {
      console.log(context.user);
      if (!context.user) throw new Error("Unauthorized access");
      if (!args) throw new Error("Invalid arguments");
      if (!args.input) throw new Error("Service input is required");
      return await ServiceDataSource.createService(args.input);
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  updateService: async (parent, args, context, info) => {
    try {
      if (!context.user) throw new Error("Unauthorized access");
      if (!args) throw new Error("Invalid arguments");
      if (!args.id) throw new Error("Service ID is required");
      if (!args.input) throw new Error("Service input is required");
      return await ServiceDataSource.updateService(args);
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  deleteServiceById: async (parent, args, context, info) => {
    try {
      if (!context.user) throw new Error("Unauthorized access");
      if (!args) throw new Error("Invalid arguments");
      if (!args._id) throw new Error("Service ID is required");
      return await ServiceDataSource.deleteServiceById(args._id);
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
};

module.exports.resolvers = { queries, mutations };
