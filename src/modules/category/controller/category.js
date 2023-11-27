import { create, find, findById, findByIdAndUpdate } from '../../../../DB/DBMethods.js'
import categoryModel from '../../../../DB/models/Category.model.js'
import cloudinary from '../../../services/cloudinary.js'
import { asyncHandler } from '../../../services/errorHandling.js'
import slugify from 'slugify'
import { paginate } from '../../../services/pagination.js'

//Add A New Category

export const createCategory = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    next(new Error('Image Is Required'), { cause: 400 })
  } else {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
      folder: 'E-Commerce/Category',
    })
    const { name } = req.body
    const category = await create({
      model: categoryModel,
      data: {
        name,
        slug: slugify(name),
        image: secure_url,
        imagePublicId: public_id,
        createdBy: req.user._id,
      },
    })
    category
      ? res.status(201).json({ message: 'Done', category })
      : next(new Error('Fail To Create New Category'), { cause: 400 })
  }
})

//Update Category

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
      folder: 'E-Commerce/Category',
    })
    req.body.image = secure_url
    req.body.imagePublicId = public_id
  }
  if (req.body.name) {
    req.body.slug = slugify(req.body.name)
  }
  req.body.updatedBy = req.user._id
  const category = await findByIdAndUpdate({
    model: categoryModel,
    filter: { _id: id },
    data: req.body,
    options: { new: false },
  })
  if (req.file) {
    await cloudinary.uploader.destroy(category.imagePublicId)
  }
  category
    ? res.status(200).json({ message: 'Done !', category })
    : next(new Error('Fail To Update The Category'), { cause: 400 })
})

//Get All Categories

export const getAllCategories = asyncHandler(async (req, res, next) => {
  const { skip, limit } = paginate({
    page: req.query.page,
    size: req.query.size,
  })
  const category = await find({
    model: categoryModel,
    populate: [
      { path: 'createdBy', select: 'userName , email , image' },
      { path: 'updatedBy', select: 'userName , email , image' },
      { path: 'subCategory' },
    ],
    skip,
    limit,
  })
  res.status(200).json({ message: 'Done', category })
})

//Get Category By Id

export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const category = await findById({ model: categoryModel, filter: { _id: id } })
  if (!category) {
    next(new Error('Cant Find This Category '), { cause: 400 })
  } else {
    res.status(200).json({ message: 'Done', category })
  }
})
