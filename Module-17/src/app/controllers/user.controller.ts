import express, { Request, Response } from 'express';
import { User } from '../model/user.model';

export const usersRouter = express.Router();

//craete new user
usersRouter.post('/create-user', async(req: Request, res: Response) => {
  const body = req.body;
  const user=await User.create(body);
  res.status(201).json({ message: 'User created successfully', user });
});

//get all users
usersRouter.get('/', async(req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

//get single user by id
usersRouter.get('/:userId', async(req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.json(user);
});

//update user by id
usersRouter.patch('/update-user/:userId', async(req: Request, res: Response) => {
  const userId = req.params.userId;
  const body = req.body;
  const user = await User.findByIdAndUpdate(userId, body, { new: true });
  res.json({message: 'User updated successfully',user});
});

//delete user by id
usersRouter.delete('/delete-user/:userId', async(req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);
  res.json({message: 'User deleted successfully',user});
});