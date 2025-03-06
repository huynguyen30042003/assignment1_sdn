import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  keywords: [String],
  correctAnswerIndex: { type: Number, required: true }
},
{timestamps: true, versionKey: false});

export default mongoose.model('Question', questionSchema);
