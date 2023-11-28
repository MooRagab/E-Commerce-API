import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import endPoint from './cart.endPoint.js'
import * as cartController from './controller/cart.js'


const router = Router()

router.post('/',  auth(endPoint.add), cartController.addToCart)

export default router
