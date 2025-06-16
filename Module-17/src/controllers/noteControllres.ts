import { Notes } from "../model/schemaModel";
import express, { Request, Response } from "express";
export const router=express.Router();

//create new note
router.post('/create-note', async (req:Request, res:Response) => {
  const body = req.body;
  const note = await Notes.create(body);
  res.status(201).json({ message: 'Note created successfully', note });
});

//get all notes
router.get('/', async (req:Request, res:Response) => {
  const notes = await Notes.find();
  res.json(notes);
});

//get single note by id
router.get('/:id', async (req:Request, res:Response) => {
  const id = req.params.id;
  const note = await Notes.findById(id);
  res.json(note);
});

//update note by id
router.put('/update-note/:id', async (req:Request, res:Response) => {
  const id = req.params.id;
  const body = req.body;
  const note = await Notes.findByIdAndUpdate(id, body, { new: true });
  res.json(note);
});

//delete note by id
router.delete('/delete-note/:id', async (req:Request, res:Response) => {
  const id = req.params.id;
  const note = await Notes.findByIdAndDelete(id);
  res.json(note);
});
