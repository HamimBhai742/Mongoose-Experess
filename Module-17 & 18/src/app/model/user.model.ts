import { model, Schema } from 'mongoose';
import {
  IAddress,
  IUser,
  UserMethods,
  UserStatic,
} from '../interfaces/user.interface';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new Schema<IUser, UserStatic, UserMethods>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [5, 'First name must be at least 5 characters long'],
      maxlength: [10, 'First name must be at most 10 characters long'],
    },
    lastName: {
      type: String,
      trim: true,
      minlength: [5, 'Last name must be at least 5 characters long'],
      maxlength: [10, 'Last name must be at most 10 characters long'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'Age must be at least 18 years old'],
      max: [40, 'Age must be at most 40 years old'],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    phone: {
      type: String,
      trim: true,
      unique: [true, 'Phone number already exists'],
      maxlength: [14, 'Phone number must be at most 14 characters long'],
      required: [true, 'Phone number is required'],
      validate: {
        validator: function (v) {
          return /^\+8801[3-9]\d{8}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    address: {
      type: addressSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// const hasPasswordSchema = new Schema({
//   password: String,
// });
userSchema.method('hasPassword', async function (password: string) {
  const pass = await bcrypt.hash(password, 10);
  return pass;
});

userSchema.static('hashPassword', async function (password: string) {
  console.log(password)
  const pass = await bcrypt.hash(password, 10);
  return pass;
});

export const User = model<IUser,UserStatic>('User', userSchema);
