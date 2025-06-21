import express, { Request, Response } from 'express';
import { User } from '../model/user.model';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const usersRouter = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  phone: z.string(),
});
//craete new user
usersRouter.post('/create-user', async (req: Request, res: Response) => {
  try {
    // const zodBody = CreateUserZodSchema.parse(req.body);
    // console.log(body);
    const body = req.body;

    //---
    //const user = new User(body);
    // const password = await user.hasPassword(body.password);
    // console.log(password);
    // user.password = password;
    // await user.save();

    const password = await User.hashPassword(body.password);
    console.log(password)
    body.password = password;
    const user = await User.create(body);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

//get all users
usersRouter.get('/', async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

//get single user by id
usersRouter.get('/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.json(user);
});

//update user by id
usersRouter.patch(
  '/update-user/:userId',
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const body = req.body;
    const user = await User.findByIdAndUpdate(userId, body, { new: true });
    res.json({ message: 'User updated successfully', user });
  }
);

//delete user by id
usersRouter.delete(
  '/delete-user/:userId',
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully', user });
  }
);
