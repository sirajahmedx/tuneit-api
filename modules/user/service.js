const UserModel = require("./model");
const { createHmac, randomBytes } = require("node:crypto");
const JWT = require("jsonwebtoken");

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

function generateToken(user) {
  if (!user) throw new Error("User not found");

  if (!user.verified) throw new Error("User not verified");

  if (user.account_status !== "active") throw new Error("User not active");

  return JWT.sign(
    {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET
  );
}
async function createCustomer(args) {
  try {
    if (!args.first_name) throw new Error("First name is required");
    if (!args.password) throw new Error("Password is required");

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

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = generateHash(salt, args.password);

    const userData = {
      ...args,
      role: "user",
      salt,
      password: hashedPassword,
    };

    const user = await UserModel.create(userData);

    if (!user) throw new Error("Failed to create user");
    return {
      success: true,
      message: "Customer Created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to create customer",
    };
  }
}

async function updateCustomer(args) {
  try {
    if (!args._id) throw new Error("User ID is required");

    const user = await UserModel.findById(args._id);
    if (!user) throw new Error("User not found");

    if (args.email && args.email !== user.email) {
      const userExistByEmail = await getUserByEmail(args.email);
      if (userExistByEmail) {
        throw new Error("Email already exists");
      }
    }

    if (args.phone && args.phone !== user.phone) {
      const userExistByPhone = await getUserByPhone(args.phone);
      if (userExistByPhone) {
        throw new Error("Phone number already exists");
      }
    }

    const updatedData = { ...args };
    delete updatedData._id;

    const updatedUser = await UserModel.findByIdAndUpdate(
      args._id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) throw new Error("Failed to update user");

    return {
      success: true,
      message: "User updated successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to update user",
    };
  }
}

async function createMechanic(args) {
  try {
    if (!args.first_name) throw new Error("First name is required");
    if (!args.password) throw new Error("Password is required");

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

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = generateHash(salt, args.password);

    const userData = {
      ...args,
      role: "mechanic",
      salt,
      password: hashedPassword,
    };

    const user = await UserModel.create(userData);

    if (!user) throw new Error("Failed to create user");
    return {
      success: true,
      message: "Mechanic Created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to create mechanic",
    };
  }
}

async function updateMechanic(args) {
  try {
    if (!args._id) throw new Error("User ID is required");

    const user = await UserModel.findById(args._id);
    if (!user) throw new Error("User not found");

    if (args.email && args.email !== user.email) {
      const userExistByEmail = await getUserByEmail(args.email);
      if (userExistByEmail) {
        throw new Error("Email already exists");
      }
    }

    if (args.phone && args.phone !== user.phone) {
      const userExistByPhone = await getUserByPhone(args.phone);
      if (userExistByPhone) {
        throw new Error("Phone number already exists");
      }
    }

    const updatedData = { ...args };
    delete updatedData._id;

    const updatedUser = await UserModel.findByIdAndUpdate(
      args._id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) throw new Error("Failed to update user");

    return {
      success: true,
      message: "Mechanic updated successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to update user",
    };
  }
}

async function signIn(args) {
  try {
    const { email, phone, password } = args;
    let user;
    if (email) {
      user = await getUserByEmail(email);
    } else if (phone) {
      user = await getUserByPhone(phone);
    } else {
      throw new Error("Email or phone is required");
    }

    if (!user) {
      throw new Error("User not found");
    }

    if (password) {
      const hashedPassword = generateHash(user.salt, password);
      if (hashedPassword !== user.password) {
        throw new Error("Incorrect password");
      }
    }

    if (!user.verified || user.verified.length === 0) {
      // const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otp = "000000";
      const otpExpiry = Date.now() + 3600000;

      await UserModel.findByIdAndUpdate(user._id, {
        otp,
        otp_expiry: otpExpiry,
      });

      // await SendEmail(user.email, "OTP Verification", otp, "otp");

      return {
        success: true,
        message: "Please verify your account",
        data: {
          verified: [],
          token: null,
        },
      };
    }

    const token = generateToken(user);

    return {
      success: true,
      message: "Login successful",
      data: {
        verified: [...user.verified],
        token,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || "An error occurred while processing the request."
    );
  }
}

const googleAuth = async (input) => {
  try {
    let user = await UserModel.findOne({ email: input.email });

    if (!user) {
      user = new UserModel({
        first_name: input.first_name,
        last_name: input.last_name,
        email: input.email,
        role: "customer", // Default role
        avatar: input.picture,
        verified: ["email"],
        account_status: "active",
        password: "",
        google_id: input.google_id,
        provider: input.provider,
        access_token: input.access_token,
        id_token: input.id_token,
      });

      await user.save();
    } else {
      user.google_id = input.google_id;
      user.provider = input.provider;
      user.access_token = input.access_token;
      user.id_token = input.id_token;
      user.avatar = input.picture;
      await user.save();
    }

    const token = generateToken(user);

    return {
      success: true,
      message: "Authentication successful",
      token,
      user,
    };
  } catch (error) {
    console.error("Google Auth Error:", error);
    return {
      success: false,
      message: "Authentication failed",
      token: null,
      user: null,
    };
  }
};
module.exports.UserService = {
  getUserByEmail,
  getUserByPhone,
  createCustomer,
  updateCustomer,
  createMechanic,
  updateMechanic,
  signIn,
  googleAuth,
};
