import Quiz from '../models/quiz.js';
import Question from '../models/question.js';
export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.find().populate('questions');
    //chi hiển thị text ở trong questions
    // const quiz = await Quiz.find().populate({
    //   path: 'questions',
    //   select: 'text' 
    // });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuizByID = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export const editQuiz = async (req, res)=>{
  try{
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(quiz);
  }catch (error){
    res.status(500).json({ message: error.message });
  }
}

export const deleteQuiz = async (req, res) => {
  try{
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if(!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted successfully' });
  }catch (error){
    res.status(500).json({ message: error.message });
  }
}

export const getQuizWithCapitalQuestions = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions')

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const filteredQuestions = quiz.questions.filter(question => 
      question.text.toLowerCase().includes('capital')
    );

    res.status(200).json({
      ...quiz.toObject(),
      questions: filteredQuestions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addQuestionToQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { text, options, keywords, correctAnswerIndex } = req.body;

    const newQuestion = new Question({ text, options, keywords, correctAnswerIndex });
    await newQuestion.save();

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    quiz.questions.push(newQuestion._id);
    await quiz.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const addMultipleQuestionsToQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const questionsData = req.body; 

    const newQuestions = await Question.insertMany(questionsData);

    const questionIds = newQuestions.map(question => question._id);
    console.log(questionIds);
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    quiz.questions.push(...questionIds);
    await quiz.save();

    res.status(201).json(newQuestions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};