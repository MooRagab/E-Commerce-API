import { Schema, model, Types } from "mongoose";


const categorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'category name must be unique'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    slug: String,
    image: String,
    imagePublicId: String,
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'Category owner is required']
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: "User"
    },
}, {

    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtual: true }
})

categorySchema.virtual('subCategory', {
    ref: "Subcategory",
    localField: "_id",
    foreignField: "categoryId"
})


const categoryModel = model('Category', categorySchema)
export default categoryModel