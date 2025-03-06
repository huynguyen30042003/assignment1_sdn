import express from 'express';
import { getAllQuestion,getQuestionByID,createQuestion,updateQuestion ,deleteQuestion} from '../controller/questionController.js';

const router = express.Router();

router.get('/',getAllQuestion)
router.get('/:id',getQuestionByID)
router.post('/',createQuestion)
router.put('/:id',updateQuestion)
router.delete('/:id',deleteQuestion)

export default router