import mongoose, { mongo } from "mongoose";
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
    type: Number,
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
    size: Joi.number().required(),
    inStock: Joi.boolean().default(true),
    discount: Joi.number().default(0),
    image: Joi.string.trim().required(),
    serialNumber: Joi.number().required(),
  });

  return joiSchema.validate(data);
};

export { productModel, productValidator };
