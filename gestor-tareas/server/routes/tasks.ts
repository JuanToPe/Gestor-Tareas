import { Router } from 'express';
import { createTask, deleteTaks, getTasks, updateTask } from '../controllers/taskController.js';

const router = Router()

router.get('/tasksList', getTasks);
router.post('/createTask', createTask);
router.patch('/:id', updateTask);
router.delete('/delete/:id', deleteTaks);

export default router