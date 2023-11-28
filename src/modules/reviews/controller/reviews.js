import { create, findOne } from '../../../../DB/DBMethods.js'
import reviewModel from '../../../../DB/models/review.model.js'
import orderModel from '../../../../DB/models/order.model.js'
import { asyncHandler } from '../../../services/errorHandling.js'

export const createReview = asyncHandler(async (req, res, next) => {
  const { productId } = req.params
  const { _id } = req.user
  const { message, rating } = req.body

  const checkReview = await findOne({
    model: reviewModel,
    filter: {
      userId: _id,
      productId,
    },
  })

  if (checkReview) {
    return next(new Error('Already reviewed by you', { cause: 409 }))
  }

  const checkOrder = await findOne({
    model: orderModel,
    filter: {
      userId: _id,
      'products.productId': productId,
      status: 'received',
    },
  })

  if (!checkOrder) {
    return next(new Error('Sorry only sold products can be reviewed', { cause: 400 }))
  }

  const review = await create({
    model: reviewModel,
    data: {
      userId: _id,
      productId,
      message,
      rating,
    },
  })
  return res.status(201).json({ message: 'Done', review })
})
