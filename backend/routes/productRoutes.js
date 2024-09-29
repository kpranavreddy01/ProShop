import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getProducts, getProductById, createProducts, updateProducts, deleteProducts, createProductReview, getTopProducts} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProducts);
router.get('/top', getTopProducts);
router.route('/:id').get(getProductById).put(protect, admin, updateProducts).delete(protect, admin, deleteProducts);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;