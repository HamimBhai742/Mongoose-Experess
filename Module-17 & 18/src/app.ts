import express, { Application } from 'express';
const app: Application = express();
import { router } from './app/controllers/noteControllres';
import { usersRouter } from './app/controllers/user.controller';
app.use(express.json());

// router controllers
app.use('/notes', router);
app.use("/users", usersRouter)

app.get('/', (req, res) => {
  res.send('Welcome to Note apps');
});

export default app;
