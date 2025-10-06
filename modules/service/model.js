const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    prices: {
      type: [
        {
          label: { type: String },
          price: { type: Number, min: 0 },
        },
      ],
      default: [],
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    duration: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      // required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    banner: {
      type: String,
      // required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    keywords: {
      type: [String],
      default: [],
    },
    service_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

ServiceSchema.index({ name: 1 });
ServiceSchema.index({ status: 1 });
ServiceSchema.index({ featured: 1 });
ServiceSchema.index({ created_at: -1 });

module.exports =
  mongoose.models.ServiceModel || mongoose.model("ServiceModel", ServiceSchema);
