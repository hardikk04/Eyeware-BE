import mongoose from "mongoose";
import Joi from "joi";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: Buffer,
    required: true,
  },
  mimeType: {
    type: String,
    default: "",
  },
  serialNumber: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const productModel = mongoose.model("product", productSchema);

const productValidator = (data) => {
  const joiSchema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    price: Joi.number().required(),
    size: Joi.string().required(),
    inStock: Joi.boolean().default(true),
    discount: Joi.number().default(0),
    mimeType: Joi.string().default(""),
    serialNumber: Joi.number().required(),
  });

  return joiSchema.validate(data);
};

export { productModel, productValidator };
