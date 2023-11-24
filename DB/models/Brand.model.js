import { Schema, model, Types } from "mongoose";


const brandSchema = new Schema({

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
    }
}, {

    timestamps: true
})


const brandModel = model('Brand', brandSchema)
export default brandModel