const ServiceModel = require("./model");

async function getAllServices(args) {
  try {
    const {
      page = 1,
      limit,
      sortField = "created_at",
      sortOrder = "asc",
      filters = {},
    } = args;

    const filterConditions = {};

    for (let key in filters) {
      if (
        filters[key] !== undefined &&
        filters[key] !== null &&
        filters[key] !== ""
      ) {
        if (key === "search") {
          const searchTerm = filters[key].trim().toLowerCase();
          const searchWords = searchTerm.split(/\s+/);

          filterConditions.$or = [
            ...searchWords.map((word) => ({
              name: { $regex: word, $options: "i" },
            })),
            ...searchWords.map((word) => ({
              description: { $regex: word, $options: "i" },
            })),
            ...searchWords.map((word) => ({
              keywords: { $regex: word, $options: "i" },
            })),
          ];
        } else if (objectIdFields.includes(key)) {
          filterConditions[key] = filters[key];
        } else if (typeof filters[key] === "string") {
          filterConditions[key] = { $regex: filters[key], $options: "i" };
        } else {
          filterConditions[key] = filters[key];
        }
      }
    }

    const sortOptions = {};
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;
    const services = await ServiceModel.find(filterConditions)
      .populate("addons")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // const totalRecords = await ServiceModel.countDocuments(filterConditions);
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
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

async function getServiceByName(name) {
  const service = await ServiceModel.findOne({ name });
  return service || null;
}
async function getServiceById(id) {
  try {
    if (!id) throw new Error("Id is required");
    const service = await ServiceModel.findById(id).populate("addons");
    if (!service) throw new Error("Service not found");
    return {
      success: true,
      message: "Service fetched successfully",
      data: service,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createService(args) {
  try {
    const serviceExists = await getServiceByName(args.name);
    if (serviceExists) throw new Error("Service already exists");
    return {
      success: true,
      message: "Service created successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateService(args) {
  try {
    const service = await ServiceModel.findByIdAndUpdate(args.id, args.input, {
      new: true,
    });
    if (!service) throw new Error("Service not found");
    return {
      success: true,
      message: "Service updated successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteServiceById(id) {
  try {
    if (!id) throw new Error("Id is required");
    const service = await ServiceModel.findByIdAndDelete(id);
    if (!service) throw new Error("Service not found");
    return {
      success: true,
      message: "Service deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports.ServiceDataSource = {
  getAllServices,
  getServiceByName,
  getServiceById,
  createService,
  updateService,
  deleteServiceById,
};
