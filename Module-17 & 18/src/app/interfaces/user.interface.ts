import { Model } from "mongoose";

export interface IAddress {
  city: string;
  state: string;
  country: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  age: number;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone: string;
  address: IAddress;
}

export interface UserMethods {
  hasPassword(password: string): string;
}

export interface UserStatic extends Model<IUser> {
  hashPassword(password: string): string;
}