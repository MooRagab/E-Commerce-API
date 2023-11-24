import { Schema, model, Types } from "mongoose";


const reviewSchema = new Schema({

    message: {
        type: String,
        required: [true, 'message is required'],

    },
    rating: {
        type: Number,
        default: 1,
        min: [1, "min 1"],
        max: [5, "min 1"],
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'userId  is required']
    },
    productId: {
        type: Types.ObjectId,
        ref: "product"
    }
}, {

    timestamps: true
})


const reviewModel = model('Review', reviewSchema)
export default reviewModel