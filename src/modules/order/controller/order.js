import { create, findByIdAndUpdate, findOne } from '../../../../DB/DBMethods.js'
import couponModel from '../../../../DB/models/coupon.model.js'
import orderModel from '../../../../DB/models/order.model.js'
import productModel from '../../../../DB/models/Product.model.js'
import { asyncHandler } from '../../../services/errorHandling.js'

export const createOrder = asyncHandler(async (req, res, next) => {
  const { couponId, products } = req.body
  const { _id } = req.user //login user

  const finalList = []
  let sumTotal = 0

  for (let i = 0; i < products.length; i++) {
    const checkItem = await findOne({
      model: productModel,
      filter: {
        _id: products[i].productId,
        stock: { $gte: products[i].quantity },
      },
    })
    if (!checkItem) {
      return next(new Error('In-valid to place this order', { cause: 409 }))
    }
    products[i].unitPrice = checkItem.finalPrice
    products[i].totalPrice = checkItem.finalPrice * products[i].quantity
    sumTotal += products[i].totalPrice
    finalList.push(products[i])
  }
  req.body.sumTotal = sumTotal
  req.body.totalPrice = sumTotal

  if (couponId) {
    const checkCoupon = await findOne({
      model: couponModel,
      filter: { _id: couponId, usedBy: { $nin: _id } },
    })
    if (!checkCoupon) {
      return next(new Error('In-valid coupon', { cause: 409 }))
    }

    req.body.totalPrice = sumTotal - sumTotal * (checkCoupon.amount / 100)
  }

  req.body.userId = _id
  req.body.products = finalList
  const order = await create({
    model: orderModel,
    data: req.body,
  })

  if (order) {
    if (couponId) {
      await findByIdAndUpdate({
        model: couponModel,
        filter: couponId,
        data: { $addToSet: { usedBy: _id } },
      })
    }

    return res.status(201).json({ message: 'Done', order })
  } else {
    return next(new Error('Fail to place your order', { cause: 400 }))
  }
})
