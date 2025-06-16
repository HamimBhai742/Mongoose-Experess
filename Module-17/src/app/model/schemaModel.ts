import { model, Schema } from "mongoose";

//mongoose scema
const noteScema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: '' },
  category: {
    type: String,
    enum: ['work', 'personal', 'study'],
    default: 'personal',
  },
  pined: { type: Boolean, default: false }
  } ,{
  versionKey: false,
  timestamps: true
});

//mongoose model
export const Notes = model('Notes', noteScema);