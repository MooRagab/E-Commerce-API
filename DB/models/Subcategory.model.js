import { Schema, model, Types } from 'mongoose'

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      unique: [true, 'SubCategory name must be unique'],
      min: [2, 'minimum length 2 char'],
      max: [20, 'max length 2 char'],
    },
    slug: String,
    image: String,
    imagePublicId: String,
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'SubCategory owner is required'],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
    categoryId: {
      type: Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  },
)

const subcategoryModel = model('SubCategory', subCategorySchema)
export default subcategoryModel
