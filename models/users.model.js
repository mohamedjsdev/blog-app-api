const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
        publicId: null,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model("User", userSchema);
// validate register user
const validateRegisterUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(obj);
};
// validate login user
const validateLoginUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(obj);
};
// validate update user
const validateUpdateUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50),
    bio: Joi.string(),
    password: Joi.string().min(8),
  });
  return schema.validate(obj);
};

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
