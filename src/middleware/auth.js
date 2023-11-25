import jwt from 'jsonwebtoken'
import { userModel } from '../../DB/models/User.model.js'
import { asyncHandler } from '../services/errorHandling.js'
import { findById } from '../../DB/DBMethods.js'

export const auth = (accessRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization?.startsWith(process.env.BEARERKEY)) {
      next(new Error('In-Valid Bearer Key', { cause: 401 }))
    } else {
      const token = authorization.split(process.env.BEARERKEY)[1]
      const decoded = jwt.verify(token, process.env.SIGNINTOKEN)
      if (!decoded?.id || !decoded?.isLoggedIn) {
        next(new Error('In-Valid Token Payload', { cause: 401 }))
      } else {
        const user = await findById({
          model: userModel,
          filter: decoded.id,
          select: 'email userName role',
        })
        if (!user) {
          next(new Error('Not Register User', { cause: 404 })) // not login user
        } else {
          if (!accessRoles.includes(user.role)) {
            next(new Error('Not Auth User', { cause: 403 }))
          } else {
            req.user = user
            return next()
          }
        }
      }
    }
  })
}
