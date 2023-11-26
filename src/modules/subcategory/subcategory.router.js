import { Router } from 'express'
import endPoint from './subcategory.endPoint.js'
import { auth } from '../../middleware/auth.js'
import * as subCategoryController from './controller/subcategory.js'
import { fileValidation, myMulter } from '../../services/multer.js'

const router = Router({ mergeParams: true })

router.post(
  '/',
  auth(endPoint.add),
  myMulter(fileValidation.image).single('image'),
  subCategoryController.createSubCategory,
)

router.put(
  '/:id',
  auth(endPoint.update),
  myMulter(fileValidation.image).single('image'),
  subCategoryController.updateSubCategory,
)

export default router
