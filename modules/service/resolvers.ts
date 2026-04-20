import { service } from "./service";
const queries = {
  getAllServices: async (parent:any, args:object, context:any, info:any) => {
    try {
      return await service.getAllServices(args);
    } catch (error:any) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  },

  getServiceById: async (parent:unknown, args:{ id: string }, context:any, info:string) => {
    try {
      if (!args) throw new Error("Invalid arguments");
      if (!args.id) throw new Error("Service ID is required");
      return await service.getServiceById(args.id);
    } catch (error:any) {
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
  createService: async (parent:unknown, args:{ input: any }, context:any, info:any) => {
    try {
      console.log(context.user);
      if (!context.user) throw new Error("Unauthorized access");
      if (!args) throw new Error("Invalid arguments");
      if (!args.input) throw new Error("Service input is required");
      return await service.createService(args.input);
    } catch (error:any) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  updateService: async (parent:unknown, args:{ id: string; input: any }, context:any, info:any) => {
    try {
      if (!context.user) throw new Error("Unauthorized access");
      if (!args) throw new Error("Invalid arguments");
      if (!args.id) throw new Error("Service ID is required");
      if (!args.input) throw new Error("Service input is required");
      return await service.updateService(args);
    } catch (error:any) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },

  deleteServiceById: async (parent:unknown, args:{ id: string }, context:any, info:any) => {
    try {
      if (!context.user) throw new Error("Unauthorized access");
      if (!args) throw new Error("Invalid arguments");
      if (!args.id) throw new Error("Service ID is required");
      return await service.deleteServiceById(args.id);
    } catch (error:any) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
};

export const resolvers = {
  queries,
  mutations,
};