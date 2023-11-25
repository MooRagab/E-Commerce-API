import { Router } from 'express'
import endPoint from './category.endPoint.js'
import { auth } from '../../middleware/auth.js'
import * as categoryController from './controller/category.js'
import { fileValidation, myMulter } from '../../services/multer.js'

const router = Router()

router.post(
  '/',
  auth(endPoint.add),
  myMulter(fileValidation.image).single('image'),
  categoryController.addCategory,
)

router.put(
  '/:id',
  auth(endPoint.update),
  myMulter(fileValidation.image).single('image'),
  categoryController.updateCategory,
)

router.get('/', categoryController.getAllCategories)

export default router
