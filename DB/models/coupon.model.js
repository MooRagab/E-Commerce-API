import { Schema, model, Types } from "mongoose";

const couponSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'category name must be unique'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
        trim: true

    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'Category owner is required']
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    amount: {
        type: Number,
        default: 1,
        max: [100, "max is 100%"],
        min: [1, "min is 1%"],
    },
    usedBy: [{
        type: Types.ObjectId,
        ref: "User",
    }],
    expireDate: String
}, {

    timestamps: true
})


const couponModel = model('Coupon', couponSchema)
export default couponModel