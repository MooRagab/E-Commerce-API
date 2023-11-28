import { Router } from 'express'
import * as reviewsController from './controller/reviews.js'
import endPoint from './reviews.endPoint.js'
import { auth } from '../../middleware/auth.js'

const router = Router({ mergeParams: true })

router.post('/', auth(endPoint.add), reviewsController.createReview)

export default router
