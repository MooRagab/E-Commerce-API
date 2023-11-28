import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import endPoint from './order.endPoint.js'
import * as orderController from './controller/order.js'
const router = Router()

router.post('/', auth(endPoint.add), orderController.createOrder)

export default router
