import express from 'express';
import { getProducts, createProducts, updateProducts, deleteProducts, handleBanner } from '../Controllers/productController.js';
const router = express.Router();

router.get('/', getProducts);
router.post('/', createProducts);
router.patch('/:id', updateProducts);
router.delete('/:id', deleteProducts);
router.patch('/banner/:id', handleBanner);

export default router;