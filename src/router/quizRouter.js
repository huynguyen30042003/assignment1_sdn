import express from "express";
import { getQuiz,getQuizByID,createQuiz,editQuiz,deleteQuiz ,getQuizWithCapitalQuestions,addQuestionToQuiz, addMultipleQuestionsToQuiz} from "../controller/quizController.js";

const router  =  express.Router();

router.get("/",getQuiz)
router.get("/:id",getQuizByID)
router.post("/",createQuiz)
router.put("/:id",editQuiz)
router.delete("/:id",deleteQuiz)
router.get("/:quizId/populate",getQuizWithCapitalQuestions)
router.post("/:quizId/question",addQuestionToQuiz)
router.post("/:quizId/questions", addMultipleQuestionsToQuiz);

export default router;