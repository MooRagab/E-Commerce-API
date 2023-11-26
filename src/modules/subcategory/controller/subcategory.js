import {
  create,
  findById,
  findByIdAndUpdate,
  findOne,
} from '../../../../DB/DBMethods.js'
import categoryModel from '../../../../DB/models/Category.model.js'
import cloudinary from '../../../services/cloudinary.js'
import { asyncHandler } from '../../../services/errorHandling.js'
import slugify from 'slugify'
import subcategoryModel from '../../../../DB/models/Subcategory.model.js'

//Add A New SubCategory

export const createSubCategory = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    next(new Error('Image Is Required'), { cause: 400 })
  } else {
    const { categoryId } = req.params

    const category = await findById({
      model: categoryModel,
      filter: categoryId,
    })
    if (!category) {
      next(new Error('Cant Find The Category'), { cause: 404 })
    } else {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `E-Commerce/Category/${category._id}` },
      )
      const { name } = req.body
      const subCategory = await create({
        model: subcategoryModel,
        data: {
          name,
          slug: slugify(name),
          image: secure_url,
          imagePublicId: public_id,
          createdBy: req.user._id,
          categoryId: category._id,
        },
      })
      subCategory
        ? res.status(201).json({ message: 'Done', subCategory })
        : next(new Error('Fail To Create New SubCategory'), { cause: 400 })
    }
  }
})

//Update Category

export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id, categoryId } = req.params
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `E-Commerce/Category/${categoryId}` },
    )
    req.body.image = secure_url
    req.body.imagePublicId = public_id
  }
  const category = await findOne({
    model: subcategoryModel,
    filter: { _id: id, categoryId: categoryId },
  })
  if (!category) {
    next(new Error('Cant Find This SubCategory'), { cause: 404 })
  } else {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name)
    }
    req.body.updatedBy = req.user._id
    const subCategory = await findByIdAndUpdate({
      model: subcategoryModel,
      filter: { _id: id, categoryId: categoryId },
      data: req.body,
      options: { new: false },
    })
    if (req.file) {
      await cloudinary.uploader.destroy(category.imagePublicId)
    }
    subCategory
      ? res.status(200).json({ message: 'Done !', subCategory })
      : next(new Error('Fail To Update The Category'), { cause: 400 })
  }
})

