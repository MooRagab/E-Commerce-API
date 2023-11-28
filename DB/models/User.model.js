import { Schema, model, Types } from 'mongoose'

export const roles = {
  Admin: 'Admin',
  User: 'User',
  HR: 'HR',
}
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'userName is required'],
      min: [2, 'minimum length 2 char'],
      max: [20, 'max length 2 char'],
    },
    email: {
      type: String,
      unique: [true, 'email must be unique value'],
      required: [true, 'email is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: 'User',
      enum: [roles.Admin, roles.User, roles.HR],
    },
    active: {
      type: Boolean,
      default: false,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    image: String,
    DOB: String,
    wishlist: [
      {
        type: Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const userModel = model('User', userSchema)
