import Question from "../models/question.js";

export const getAllQuestion = async (req,res) => {
  try {
    const questions = await Question.find()
    if (questions.length === 0) res.status(404).json({message: 'No Question found'})
    res.json(questions);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

export const getQuestionByID = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
    if (!question) return res.status(404).json({message: 'Question not found'})
    res.json(question)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

export const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body)
    const savedQuestion = await newQuestion.save()
    res.status(201).json(savedQuestion)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}
export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!updatedQuestion) return res.status(404).json({message: 'Question not found'})
    res.json(updatedQuestion)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}
export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id)
    if (!deletedQuestion) return res.status(404).json({message: 'Question not found'})
    res.json({message: 'Question deleted successfully'})
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}