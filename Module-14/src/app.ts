import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import fs from 'fs';
import path from 'path';
import { todosRouter } from './app/router/todos_router';

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/todos', todosRouter);

app.get('/', (req: Request, res: Response) => {
  // console.log(first);
  res.send('Welcome to Todos Express');
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({message:"Sorry can't find that!"})
})

// error middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong',error: err.message });
});

export default app;
