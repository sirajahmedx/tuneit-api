const UserModel = require("./model");
const { randomBytes, createHmac } = require("crypto");

function generateHash(salt, password) {
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return hashedPassword;
}

async function getUserByEmail(email) {
  const user = await UserModel.findOne({ email });
  return user || null;
}

async function getUserByPhone(phone) {
  const user = await UserModel.findOne({ phone });
  return user || null;
}
async function createCustomer(args) {
  try {
    // Validate required fields
    if (!args.first_name) throw new Error("First name is required");
    if (!args.password) throw new Error("Password is required");

    // Check for existing user
    if (args.phone) {
      const userExistByPhone = await getUserByPhone(args.phone);
      if (userExistByPhone) {
        throw new Error("Phone number already exists");
      }
    }

    if (args.email) {
      const userExistByEmail = await getUserByEmail(args.email);
      if (userExistByEmail) {
        throw new Error("Email already exists");
      }
    }

    // Hash password
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = generateHash(salt, args.password);

    // Prepare user data
    const userData = {
      ...args,
      salt,
      password: hashedPassword,
    };

    const user = await UserModel.create(userData);

    if (!user) throw new Error("Failed to create user");

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to create customer",
    };
  }
}
module.exports.UserService = {
  createCustomer,
  getUserByEmail,
  getUserByPhone,
};
