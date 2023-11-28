import { Router } from 'express'
import endPoint from './brand.endPoint.js'
import { auth } from '../../middleware/auth.js'
import * as brandController from './controller/brand.js'
import { fileValidation, myMulter } from '../../services/multer.js'
import { validation } from '../../middleware/valdiation.js'
import * as validator from './brand.validation.js'
const router = Router({ mergeParams: true })

router.post(
  '/',
  validation(validator.addBrand),
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
