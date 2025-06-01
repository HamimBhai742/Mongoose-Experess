import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { client } from '../../config/mongodb';
import { ObjectId } from 'mongodb';
const filePath = path.join(__dirname, '../../../db/todo.json');

export const todosRouter = express.Router();

const db = client.db('todosDB');

const todosCollection = db.collection('todos');

//create new todos
todosRouter.post('/create-todo', async (req: Request, res: Response) => {
  const { title, description } = req.body;
  interface Todo {
    title: string;
    description: string;
    createAt: string;
    isCompleted: boolean;
  }
  const todo:Todo = {
    title:title,
    description:description,
    createAt: new Date().toLocaleString(),
    isCompleted: false,
  };
   const result = await todosCollection.insertOne(todo);
  res.json({ message: 'success', result });
});

//get all todos
todosRouter.get('/', async (req: Request, res: Response) => {
  const result = await todosCollection.find({}).toArray();
  res.send(result);
});

//get single todo by id
todosRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await todosCollection.findOne(query);
  res.send(result);
});

//update todo by id
todosRouter.put('/update-todo/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description,isCompleted } = req.body;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      title,
      description,
      isCompleted
    },
  };
  const result = await todosCollection.updateOne(filter, updateDoc);
  res.json({message: 'Todos updated successfully', result});
})

//todo delete
todosRouter.delete('/delete-todo/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await todosCollection.deleteOne(query);
  res.json({message: 'Todos deleted successfully', result});
})
