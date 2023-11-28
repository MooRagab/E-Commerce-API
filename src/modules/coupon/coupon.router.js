import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import * as couponController from './controller/coupon.js'
import { endPoint } from './coupon.endPoint.js'

const router = Router()

router.post('/', auth(endPoint.createCoupon), couponController.createCoupon)
router.put('/:id', auth(endPoint.updateCoupon), couponController.updateCoupon)
router.delete('/:id', auth(endPoint.deleteCoupon), couponController.deleteCoupon)

export default router
