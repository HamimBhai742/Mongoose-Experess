import { model, Schema } from "mongoose";
import { INote } from "../interfaces/note.interface";

//mongoose scema
const noteScema = new Schema<INote>({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: '' },
  category: {
    type: String,
    enum: ['work', 'personal', 'study'],
    default: 'personal',
  },
  pined: { type: Boolean, default: false },
  
  } ,{
  versionKey: false,
  timestamps: true
});

//mongoose model
export const Notes = model('Notes', noteScema);