import { Router } from 'express'
import endPoint from './category.endPoint.js'
import { auth } from '../../middleware/auth.js'
import * as categoryController from './controller/category.js'
import { fileValidation, myMulter } from '../../services/multer.js'
import subCategoryRouter from '../subcategory/subcategory.router.js'
const router = Router()

router.use('/:categoryId/subcategory', subCategoryRouter)

router.post(
  '/',
  auth(endPoint.add),
  myMulter(fileValidation.image).single('image'),
  categoryController.createCategory,
)

router.put(
  '/:id',
  auth(endPoint.update),
  myMulter(fileValidation.image).single('image'),
  categoryController.updateCategory,
)

router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)

export default router
