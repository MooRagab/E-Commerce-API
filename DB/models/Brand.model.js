import { Schema, model, Types } from 'mongoose'

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name Is Required'],
      unique: [true, 'Brand Name Must Be Unique'],
      min: [1, 'Minimum Length 2 Char'],
      max: [20, 'Max Length 2 Char'],
    },
    slug: String,
    image: String,
    imagePublicId: String,
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Brand owner is required'],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const brandModel = model('Brand', brandSchema)
export default brandModel
