import express, { Application, Request, Response } from 'express';
const app: Application = express();
import fs from 'fs';
import path from 'path';
import { todosRouter } from './app/router/todos_router';

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/todos', todosRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Todos Express');

});

export default app;
