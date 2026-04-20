import { resolvers } from "./resolvers";
import { model } from "./model";

type ServiceResponse<T = any> = {
  success: true;
  message: string;
  data: T;
} | {
  success: false;
  message: string;
  error: Error;
};


type getAllServicesFilters = {
    name?: string;
    service_type?: string;
    category?: string;
    sub_category?: string;
    keywords?: string;
    featured?: boolean;
    search?: string;
    visit_type?: string;
}

type Price = {
  _id?: string;
  label?: string;
  price?: number;
};

type serviceInput = {
  name?: string;
  service_type?: string;
  category?: string;
  description?: string;
  sub_category?: string;
  price_type?: string;
  prices?: Price[];
  banner?: string;
  images?: string[];
  featured?: boolean;
  duration?: number;
  discount?: number;
  status?: string;
  count?: number;
  requires_advance_payment?: boolean;
  advance_payment_percentage?: number;
  keywords?: string[];
};

type getAllServicesResponse = {
  success: boolean;
  message: string;
  data: any[];
  pageInfo?: {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  error?: Error;
};





async function getAllServices(args: { page?: number; limit?: number; sortField?: string; sortOrder?: string; filters?: getAllServicesFilters }): Promise<getAllServicesResponse> {
  try {
    const {
      page = 1,
      limit = 10,
      sortField = "created_at",
      sortOrder = "asc",
      filters = {},
    } = args;

    const filterConditions: Record<string, any> = {};

    const objectIdFields: string[] = [];
    for (const key in filters) {
      const value = filters[key as keyof getAllServicesFilters];
      if (value !== undefined && value !== null && value !== "") {
        if (key === "search") {
          const searchTerm = (value as string).trim().toLowerCase();
          const searchWords = searchTerm.split(/\s+/);

          filterConditions.$or = [
            ...searchWords.map((word: string) => ({
              name: { $regex: word, $options: "i" },
            })),
            ...searchWords.map((word: string) => ({
              description: { $regex: word, $options: "i" },
            })),
            ...searchWords.map((word: string) => ({
              keywords: { $regex: word, $options: "i" },
            })),
          ];
        } else if (objectIdFields.includes(key)) {
          filterConditions[key] = value;
        } else if (typeof value === "string") {
          filterConditions[key] = { $regex: value, $options: "i" };
        } else {
          filterConditions[key] = value;
        }
      }
    }

    const sortOptions: Record<string, any> = {};
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;
    const services = await model.find(filterConditions)
      .populate("addons")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // const totalRecords = await model.countDocuments(filterConditions);
    // const totalPages = Math.ceil(totalRecords / limit);

    return {
      success: true,
      message: "Services fetched successfully",
      data: services,
      // pageInfo: {
      //   totalRecords,
      //   totalPages,
      //   currentPage: page,
      //   hasNextPage: page < totalPages,
      //   hasPreviousPage: page > 1,
      // },
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      message: err.message,
      data: [],
      error: err,
    };
  }
}

async function getServiceByName(name:string) {
  const service = await model.findOne({ name });
  return service || null;
}

async function getServiceById(id:string) {
  try {
    if (!id) throw new Error("Id is required");
    const service = await model.findById(id).populate("addons");
    if (!service) throw new Error("Service not found");
    return {
      success: true,
      message: "Service fetched successfully",
      data: service,
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err);
    return {
      success: false,
      message: err.message,
      error: err,
    };
  }
}

async function createService(args: serviceInput) {
  try {
    if (!args.name) throw new Error("Name is required");
    const serviceExists = await getServiceByName(args.name);
    if (serviceExists) throw new Error("Service already exists");
    const service = await model.create(args);
    return {
      success: true,
      message: "Service created successfully",
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      message: err.message,
      error: err,
    };
  }
}

async function updateService(args: { id: string; input: serviceInput }) {
  try {
    const service = await model.findByIdAndUpdate(args.id, args.input, {
      new: true,
    });
    if (!service) throw new Error("Service not found");
    return {
      success: true,
      message: "Service updated successfully",
      data: service,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      message: err.message,
      error: err,
    };
  }
}

async function deleteServiceById(id: string) {
  try {
    if (!id) throw new Error("Id is required");
    const service = await model.findByIdAndDelete(id);
    if (!service) throw new Error("Service not found");
    return {
      success: true,
      message: "Service deleted successfully",
      data: service,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      message: err.message,
      error: err,
    };
  }
}


export const service = { 
  getAllServices,
  getServiceByName,
  getServiceById,
  createService,
  updateService,
  deleteServiceById,
};


 
