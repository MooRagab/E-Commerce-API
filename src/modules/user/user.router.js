import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import * as userController from './controller/user.js'
import { endPoint } from './user.endPoint.js'

const router = Router()

router.get('/', auth(endPoint.profile), userController.profile)

export default router
