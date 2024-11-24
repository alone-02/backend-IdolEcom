const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        prouductId: {
          type: Schema.Types.ObjectId,
          ref: "",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual("id").get(function () {
   // console.log(this._id.toHexString());
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

const Users =
  mongoose.models.signupUser || mongoose.model("Users", userSchema);

module.exports = Users;