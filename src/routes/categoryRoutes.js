import express from 'express';
import { createCategory, updateCategory,getAllCategories } from '../controllers/categoryController.js';
import { validateCategory } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/', validateCategory, createCategory);
router.put('/:id', validateCategory, updateCategory);
router.get('/', getAllCategories);

export default router;
