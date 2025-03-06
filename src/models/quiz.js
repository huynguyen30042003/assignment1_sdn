import mongoose, { Schema } from 'mongoose';

const quizSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

export default mongoose.model('Quiz', quizSchema);
