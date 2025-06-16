import express, { Application } from 'express';
const app: Application = express();
import { router } from './app/controllers/noteControllres';
app.use(express.json());

// const noteRouter = require('./controllers/noteControllres');
app.use('/notes', router);

app.get('/', (req, res) => {
  res.send('Welcome to Note apps');
});

export default app;
