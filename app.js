import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

//Set Directory dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.join(__dirname, './config/.env'),
})

import express from 'express'
import * as indexRouter from './src/modules/index.router.js'
import connectDB from './DB/connection.js'
import { globalErrorHandler } from './src/services/errorHandling.js'
import morgan from 'morgan'
const app = express()

//SetUp Port an BaseUrl
const port = process.env.PORT || 5000
const baseUrl = process.env.BASEURL

//Convert BufferData to JSON
app.use(express.json())

//SetUp API Routings
app.use(morgan('dev'))
app.use(`${baseUrl}/auth`, indexRouter.authRouter)
app.use(`${baseUrl}/user`, indexRouter.userRouter)
app.use(`${baseUrl}/product`, indexRouter.productRouter)
app.use(`${baseUrl}/subCategory`, indexRouter.subCategoryRouter)
app.use(`${baseUrl}/category`, indexRouter.categoryRouter)
app.use(`${baseUrl}/reviews`, indexRouter.reviewsRouter)
app.use(`${baseUrl}/coupon`, indexRouter.couponRouter)
app.use(`${baseUrl}/cart`, indexRouter.cartRouter)
app.use(`${baseUrl}/order`, indexRouter.orderRouter)
app.use(`${baseUrl}/brand`, indexRouter.brandRouter)

//in-valid Page
app.use('*', (req, res, next) => {
  res.send('In-Valid Routing Please Check Url  Or  Method')
})

//Error Handling
app.use(globalErrorHandler)

//Connect
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
