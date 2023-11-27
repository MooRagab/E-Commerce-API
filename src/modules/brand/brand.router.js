import { Router } from 'express'
import endPoint from './brand.endPoint.js'
import { auth } from '../../middleware/auth.js'
import * as brandController from './controller/brand.js'
import { fileValidation, myMulter } from '../../services/multer.js'

const router = Router({ mergeParams: true })

router.post(
  '/',
  auth(endPoint.add),
  myMulter(fileValidation.image).single('image'),
  brandController.addBrand,
)

router.put(
  '/:id',
  auth(endPoint.update),
  myMulter(fileValidation.image).single('image'),
  brandController.updateBrand,
)

router.get('/', brandController.getAllBrands)
export default router
