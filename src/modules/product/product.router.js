import { Router } from 'express'
import endPoint from './product.endPoint.js'
import { auth } from '../../middleware/auth.js'
import * as productController from './controller/product.js'
import { fileValidation, myMulter } from '../../services/multer.js'

const router = Router({ mergeParams: true })

router.post(
  '/',
  auth(endPoint.add),
  myMulter(fileValidation.image).array('images', 5),
  productController.addProduct,
)

router.put(
  '/:id',
  auth(endPoint.update),
  myMulter(fileValidation.image).array('images', 5),
  productController.updateProduct,
)

router.get('/', productController.getAllProducts)
export default router
