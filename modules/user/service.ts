import {model} from "./model";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import process from "node:process";
 

function generateHash(salt: string, password: string) {
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return hashedPassword;
}

async function getUserByEmail(email: string) {
  const user = await model.findOne({ email });
  return user || null;
}

// async function getUserByPhone(phone) {
//   const user = await model.findOne({ phone });
//   return user || null;
// }

function generateToken(user : any) {
  if (!user) throw new Error("User not found");

  if (!user.verified) throw new Error("User not verified");

  if (user.account_status !== "active") throw new Error("User not active");

  return JWT.sign(
    {
      _id: user._id,
      email: user.email,
      // phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET || "jwt_secret",
  );
}
async function createCustomer(args: { input: any }) {
  try {
    const { input } = args;
    if (!input.first_name) throw new Error("First name is required");
    if (!input.password) throw new Error("Password is required");

    // if (input.phone) {
    //   const userExistByPhone = await getUserByPhone(input.phone);
    //   if (userExistByPhone) {
    //     throw new Error("Phone number already exists");
    //   }
    // }

    if (input.email) {
      const userExistByEmail = await getUserByEmail(input.email);
      if (userExistByEmail) {
        throw new Error("Email already exists");
      }
    }

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = generateHash(salt, input.password);

    const userData = {
      ...input,
      role: "user",
      salt,
      password: hashedPassword,
    };

    const user = await model.create(userData);

    if (!user) throw new Error("Failed to create user");
    return {
      success: true,
      message: "Customer Created successfully!",
    };
  } catch (error:any) {
    return {
      success: false,
      message: error.message || "Failed to create customer",
    };
  }
}

async function updateCustomer(args : { input: any }) {
  try {
    const { input } = args;
    if (!input._id) throw new Error("User ID is required");

    const user = await model.findById(input._id);
    if (!user) throw new Error("User not found");

    if (input.email && input.email !== user.email) {
      const userExistByEmail = await getUserByEmail(input.email);
      if (userExistByEmail) {
        throw new Error("Email already exists");
      }
    }

    // if (input.phone && input.phone !== user.phone) {
    //   const userExistByPhone = await getUserByPhone(input.phone);
    //   if (userExistByPhone) {
    //     throw new Error("Phone number already exists");
    //   }
    // }

    const updatedData = { ...input };
    delete updatedData._id;

    const updatedUser = await   model.findByIdAndUpdate(
      args._id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) throw new Error("Failed to update user");

    return {
      success: true,
      message: "User updated successfully!",
    };
  } catch (error:any) {
    return {
      success: false,
      message: error.message || "Failed to update user",
    };
  }
}

async function createMechanic(args:any) {
  try {
    const { input } = args;
    if (!input.first_name) throw new Error("First name is required");
    if (!input.password) throw new Error("Password is required");

    // if (input.phone) {
    //   const userExistByPhone = await getUserByPhone(input.phone);
    //   if (userExistByPhone) {
    //     throw new Error("Phone number already exists");
    //   }
    // }

    if (input.email) {
      const userExistByEmail = await getUserByEmail(input.email);
      if (userExistByEmail) {
        throw new Error("Email already exists");
      }
    }

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = generateHash(salt, input.password);

    const userData = {
      ...input,
      role: "mechanic",
      salt,
      password: hashedPassword,
    };

    const user = await model.create(userData);

    if (!user) throw new Error("Failed to create user"); 
    return {
      success: true,
      message: "Mechanic Created successfully!",
    };
  } catch (error:any) {
    return {
      success: false,
      message: error.message || "Failed to create mechanic",
    };
  }
}

async function updateMechanic(args:any) {
  try {
    const { input } = args;
    if (!input._id) throw new Error("User ID is required");

    const user = await model.findById(input._id);
    if (!user) throw new Error("User not found");

    if (input.email && input.email !== user.email) {
      const userExistByEmail = await getUserByEmail(input.email);
      if (userExistByEmail) {
        throw new Error("Email already exists");
      }
    }

    // if (input.phone && input.phone !== user.phone) {
    //   const userExistByPhone = await getUserByPhone(input.phone);
    //   if (userExistByPhone) {
    //     throw new Error("Phone number already exists");
    //   }
    // }

    const updatedData = { ...input };
    delete updatedData._id;

    const updatedUser = await model.findByIdAndUpdate(
      input._id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) throw new Error("Failed to update user");

    return {
      success: true,
      message: "Mechanic updated successfully!",
    };
  } catch (error:any) {
    return {
      success: false,
      message: error.message || "Failed to update user",
    };
  }
}

async function signIn(args: { input: any }) {
  try {
    const { input } = args;

    const { email, password } = input;
    let user;
    if (email) {
      user = await getUserByEmail(email);
    }
    // else if (phone) {
    //   user = await getUserByPhone(phone);
    // } else {
    //   throw new Error("Email or phone is required");
    // }

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

      await model.findByIdAndUpdate(user._id, {
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
          role: user.role,
        },
      };
    }

    const token = generateToken(user);
    let onboarded = false;
    if (user.role === "mechanic") {
      if (
        user.experience &&
        user.experience > 0 &&
        user.cnic &&
        user.cnic.length > 0
      ) {
        onboarded = true;
      }
    } else {
      onboarded = true;
    }
    return {
      success: true,
      message: "Login successful",
      data: {
        verified: [...user.verified],
        token,
        role: user.role,
        onboarded: onboarded,
      },
    };
  } catch (error:any) {
    console.error(error);
    throw new Error(
      error.message || "An error occurred while processing the request."
    );
  }
}

const googleAuth = async (args: { input: any }) => {
  try {
    const { input } = args;
    let user = await model.findOne({ email: input.email });

    if (!user) {
      user = new model({
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
export const service = {
    getUserByEmail,
  // getUserByPhone,
  createCustomer,
  updateCustomer,
  createMechanic,
  updateMechanic,
  signIn,
  googleAuth,
}
