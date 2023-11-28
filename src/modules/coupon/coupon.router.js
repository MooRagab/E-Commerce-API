import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import * as coupon from './controller/coupon.js'
import { endPoint } from './coupon.endPoint.js'

const router = Router()

router.post('/', auth(endPoint.createCoupon), coupon.createCoupon)
router.put('/:id', auth(endPoint.updateCoupon), coupon.updateCoupon)
router.delete('/:id', auth(endPoint.deleteCoupon), coupon.deleteCoupon)

export default router
