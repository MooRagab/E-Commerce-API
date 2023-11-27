import { create, find, findOneAndUpdate } from '../../../../DB/DBMethods.js'
import cloudinary from '../../../services/cloudinary.js'
import { asyncHandler } from '../../../services/errorHandling.js'
import slugify from 'slugify'
import brandModel from '../../../../DB/models/Brand.model.js'
import { paginate } from '../../../services/pagination.js'

//Add  New Brand

export const addBrand = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new Error('Image is required', { cause: 400 }))
  } else {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
      folder: `E-Commerce/Brand`,
    })
    const { name } = req.body
    const brand = await create({
      model: brandModel,
      data: {
        name,
        slug: slugify(name),
        image: secure_url,
        imagePublicId: public_id,
        createdBy: req.user._id,
      },
    })
    return brand
      ? res.status(201).json({ message: 'Done', brand })
      : next(new Error('Fail To Add New Brand', { cause: 400 }))
  }
})

//Update Brand

export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
      folder: `E-Commerce/Brand`,
    })
    req.body.image = secure_url
    req.body.imagePublicId = public_id
  }
  if (req.body.name) {
    req.body.slug = slugify(req.body.name)
  }
  req.body.updatedBy = req.user._id
  const brand = await findOneAndUpdate({
    model: brandModel,
    filter: { _id: id, createdBy: req.user._id },
    data: req.body,
    options: { new: true },
  })
  if (brand) {
    if (req.file) {
      await cloudinary.uploader.destroy(brand.imagePublicId)
    }
    return res.status(200).json({ message: 'Done', brand })
  } else {
    await cloudinary.uploader.destroy(req.body.imagePublicId)
    return next(new Error('Fail to Update this Brand', { cause: 400 }))
  }
})

//Get All Brands

export const getAllBrands = asyncHandler(async (req, res, next) => {
  const { limit, skip } = paginate({
    page: req.query.page,
    size: req.query.size,
  })
  const brandsList = await find({
    model: brandModel,
    filter: {},
    populate: [
      {
        path: 'createdBy',
        select: 'userName email image',
      },
    ],
    skip,
    limit,
  })

  return res.status(200).json({ message: 'Done', brandsList })
})
