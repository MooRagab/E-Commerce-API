import { create, find, findById, findOne, findOneAndUpdate } from '../../../../DB/DBMethods.js'
import cloudinary from '../../../services/cloudinary.js'
import { asyncHandler } from '../../../services/errorHandling.js'
import slugify from 'slugify'
import brandModel from '../../../../DB/models/Brand.model.js'
import { paginate } from '../../../services/pagination.js'
import productModel from '../../../../DB/models/Product.model.js'
import subcategoryModel from '../../../../DB/models/Subcategory.model.js'

//Populate For GetAllProducts

const populate = [
  {
    path: 'createdBy',
    select: 'userName email image',
  },
  {
    path: 'updatedBy',
    select: 'userName email image',
  },
  {
    path: 'categoryId',
    populate: {
      path: 'createdBy',
      select: 'userName email image',
    },
  },
  {
    path: 'subcategoryId',
    populate: {
      path: 'createdBy',
      select: 'userName email image',
    },
  },
  {
    path: 'brandId',
    populate: {
      path: 'createdBy',
      select: 'userName email image',
    },
  },
]

//Get All Brands

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const { limit, skip } = paginate({
    page: req.query.page,
    size: req.query.size,
  })
  const productList = await find({
    model: productModel,
    filter: {},
    populate: populate,
    skip,
    limit,
  })

  res.status(200).json({ message: 'Done', productList: productList })
})

//Add  New Product

export const addProduct = asyncHandler(async (req, res, next) => {
  if (!req.files?.length) {
    return next(new Error('You must upload atleast one image', { cause: 400 }))
  } else {
    const { name, price, amount, discount, subcatogryId, categoryId, brandId } = req.body
    if (name) {
      req.body.slug = slugify(name)
    }
    req.body.stock = amount
    req.body.finalPrice = price - price * ((discount || 0) / 100)
    const category = await findOne({
      model: subcategoryModel,
      filter: { _id: subcatogryId, categoryId },
    })
    if (!category) {
      return next(new Error('In-Valid Subcategory Or Category ID', { cause: 404 }))
    }
    const brand = await findOne({
      model: brandModel,
      filter: { _id: brandId },
    })
    if (!brand) {
      return next(new Error('In-Valid Brand ID', { cause: 404 }))
    }
    const images = []
    const imagePublicIds = []
    for (const file of req.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
        folder: `E-Commerce/Product/${name}`,
      })
      images.push(secure_url)
      imagePublicIds.push(public_id)
    }
    req.body.images = images
    req.body.imagePublicIds = imagePublicIds
    req.body.createdBy = req.user._id
    const product = await create({ model: productModel, data: req.body })
    res.status(201).json({
      message: 'The product has been added successfully.',
      product,
    })
  }
})

//Update Brand

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const product = await findById({ model: productModel, filter: id })
  if (!product) {
    next(new Error('Product not found', { cause: 404 }))
  }
  const { name, amount, price, discount, subcategoryId, categoryId, brandId } = req.body
  if (name) {
    req.body.slug = slugify(name)
  }
  if (amount) {
    const calStock = amount - product.soldItems
    calStock > 0 ? (req.body.stock = calStock) : (req.body.stock = 0)
  }
  if (price & discount) {
    req.body.finalPrice = price - price * (discount / 100)
  } else if (price) {
    req.body.finalPrice = price - price * (product.discount / 100)
  } else if (discount) {
    req.body.finalPrice = product.price - product.price * (discount / 100)
  }
  if (categoryId && subcategoryId) {
    const category = await findOne({
      model: subcategoryModel,
      filter: { _id: subcategoryId, categoryId },
    })
    if (!category) {
      return next(new Error('Category or SubCategory not found', { cause: 404 }))
    }
  }
  if (brandId) {
    const brand = await findOne({
      model: brandModel,
      filter: { _id: brandId },
    })
    if (!brand) {
      return next(new Error('Brand not found', { cause: 404 }))
    }
  }
  req.body.updatedBy = req.user._id
  if (req.files.length) {
    const images = []
    const imagePublicIds = []
    for (const file of req.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
        folder: `E-Commerce/Product/${name}`,
      })
      images.push(secure_url)
      imagePublicIds.push(public_id)
    }
    req.body.imagePublicIds = imagePublicIds
    req.body.images = images
  }
  const updateProduct = await findOneAndUpdate({
    model: productModel,
    data: req.body,
    filter: { _id: product._id },
    options: { new: false },
  })
  if (updateProduct) {
    for (const imageID of product.imagePublicIds) {
      await cloudinary.uploader.destroy(imageID)
    }
    return res.status(200).json({ message: 'Done', updateProduct })
  } else {
    return next(
      new Error(`Fail to update product with ID : ${product._id}`, {
        cause: 400,
      }),
    )
  }
})
