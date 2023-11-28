import express from 'express'
import userRouter from './user/user.router.js'
import productRouter from './product/product.router.js'
import reviewsRouter from './reviews/reviews.router.js'
import categoryRouter from './category/category.router.js'
import subCategoryRouter from './subcategory/subcategory.router.js'
import orderRouter from './order/order.router.js'
import couponRouter from './coupon/coupon.router.js'
import cartRouter from './cart/cart.router.js'
import brandRouter from './brand/brand.router.js'
import authRouter from './auth/auth.router.js'
import cors from 'cors'
import { globalErrorHandler } from '../services/errorHandling.js'
import connectDB from '../../DB/connection.js'
import morgan from 'morgan'

export const appRouter = (app) => {
  //convert Buffer Data
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  //setup cors
  app.use(cors({}))
  // morgan check response
  if (process.env.MOOD === 'DEV') {
    app.use(morgan('dev'))
  } else {
    app.use(morgan('combined'))
  }
  //Base URL
  const baseUrl = process.env.BASEURL
  //SetUp API Routings
  app.use(`${baseUrl}/auth`, authRouter)
  app.use(`${baseUrl}/user`, userRouter)
  app.use(`${baseUrl}/product`, productRouter)
  app.use(`${baseUrl}/subCategory`, subCategoryRouter)
  app.use(`${baseUrl}/category`, categoryRouter)
  app.use(`${baseUrl}/reviews`, reviewsRouter)
  app.use(`${baseUrl}/coupon`, couponRouter)
  app.use(`${baseUrl}/cart`, cartRouter)
  app.use(`${baseUrl}/order`, orderRouter)
  app.use(`${baseUrl}/brand`, brandRouter)
  //in-valid Page
  app.use('*', (req, res, next) => {
    res.status(404).send('404 Error Page Not Found')
  })
  //Error Handling
  app.use(globalErrorHandler)

  //Connect
  connectDB()
}
