import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
let server: Server;
const PORT = 5000;
async function main() {
  try {
    await mongoose.connect('mongodb+srv://mongodb:mongodb742@cluster0.bls3tyg.mongodb.net/note-app-db?retryWrites=true&w=majority&appName=Cluster0');
    server = app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
