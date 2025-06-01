import app from './app';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { client } from './config/mongodb';
let server;
const port = 3000;



const boostTrape = async () => {
  try {
    client.connect();
    console.log(`Database connected`);
  } catch (err) {
    console.log(err);

  }
  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
boostTrape();
