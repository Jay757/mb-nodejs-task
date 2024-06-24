import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts } from '../controllers/productController.js';
import { validateProduct } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/', validateProduct, createProduct);
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
