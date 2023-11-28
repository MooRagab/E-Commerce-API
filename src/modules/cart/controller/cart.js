import { create, findOne, findOneAndUpdate } from '../../../../DB/DBMethods.js'
import cartModel from '../../../../DB/models/cart.model.js'
import { asyncHandler } from '../../../services/errorHandling.js'

export const addToCart = asyncHandler(async (req, res, next) => {
  const { products } = req.body
  const { _id } = req.user
  const findCart = await findOne({
    model: cartModel,
    filter: { userId: _id },
  })
  if (!findCart) {
    const cart = await create({
      model: cartModel,
      data: {
        userId: _id,
        products,
      },
    })
    return res.status(201).json({ message: 'Done', cart })
  }
  for (const product of products) {
    let match = false
    for (let i = 0; i < findCart.products.length; i++) {
      if (product.productId == findCart.products[i].productId.toString()) {
        findCart.products[i] = product
        match = true
        break
      }
    }
    if (!match) {
      findCart.products.push(product)
    }
  }

  await findOneAndUpdate({
    model: cartModel,
    filter: { userId: _id },
    data: { products: findCart.products },
    options: { new: true },
  })
  return res.status(200).json({ message: 'Done', findCart })
})
