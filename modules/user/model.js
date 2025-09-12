const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  city: { type: String, maxLength: 50 },
  flat: { type: String, maxLength: 100 },
  full_address: { type: String, maxLength: 200 },
  is_default: { type: Boolean, default: false },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
  },
});

const userSchema = new Schema(
  {
    first_name: { type: String, maxLength: 50 },
    last_name: { type: String, maxLength: 50 },
    email: {
      type: String,
      maxLength: 50,
      set: function (v) {
        return v === "" ? null : v;
      },
    },
    age: { type: Number, index: true, default: 0, maxLength: 3 },
    role: {
      type: String,
      default: "user",
      enum: ["mechanic", "admin", "user", "supplier", "customer"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      index: true,
    },
    cnic: { type: String, maxLength: 15 },
    avatar: { type: String },
    cnic_back: { type: String },
    cnic_front: { type: String },
    addresses: [addressSchema],
    verified: [String],
    status: { type: String, default: "not-approved" },
    account_status: { type: String, default: "active" },
    password: { type: String, maxLength: 100 },
    salt: { type: String },
    token: { type: String },
    otp: { type: String },
    otp_expiry: { type: Date },
    job_counts: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    avg_rating: { type: Number, default: 0 },
    online: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    google_id: String,
    provider: String,
    access_token: String,
    id_token: String,
    // deviceTokens: [{ type: String, default: [] }],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true, $ne: null, $ne: "" } },
  }
);
userSchema.index(
  { phone: 1 },
  {
    unique: true,
    sparse: true,
    partialFilterExpression: { phone: { $exists: true, $ne: null, $ne: "" } },
  }
);

userSchema.index({ first_name: 1 });
userSchema.index({ role: 1 });
userSchema.index({ verified: 1 });
userSchema.index({ status: 1 });
userSchema.index({ "addresses.location": "2dsphere" });

module.exports =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
