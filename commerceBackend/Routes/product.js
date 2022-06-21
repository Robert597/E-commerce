import express from 'express';
import { getProducts, createProducts, updateProducts, deleteProducts, handleBanner } from '../Controllers/productController.js';
import ROLES_LIST from '../config/roles_list.js';
import verifyRoles from '../middleware/verifyRoles.js';
import auth from '../middleware/verifyJwt.js';

const router = express.Router();

router.get('/',  getProducts);
router.post('/', auth, verifyRoles(ROLES_LIST.Admin),  createProducts);
router.patch('/:id', auth, verifyRoles(ROLES_LIST.Admin), updateProducts);
router.delete('/:id', auth, verifyRoles(ROLES_LIST.Admin),deleteProducts);
router.patch('/banner/:id', auth,  verifyRoles(ROLES_LIST.Admin),handleBanner); 

export default router;