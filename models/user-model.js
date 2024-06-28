import mongoose from "mongoose";
import Joi from "joi";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("user", userSchema);

const userValidator = (data) => {
  const joiSchema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    isAdmin: Joi.boolean().default(false),
  });

  return joiSchema.validate(data);
};

export { userModel, userValidator };
