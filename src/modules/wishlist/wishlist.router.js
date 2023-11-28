import { Router } from 'express'
import { auth } from '../../middleware/auth.js'
import { endPoint } from './wishlist.endPoint.js'
import * as wishlistController from './controller/wishlist.js'

const router = Router({ mergeParams: true })

router.patch('/add', auth(endPoint.add), wishlistController.addWishList)
router.patch('/remove', auth(endPoint.remove), wishlistController.removeWishList)

export default router
