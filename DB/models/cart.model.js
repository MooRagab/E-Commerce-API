import { Schema, model, Types } from "mongoose";


const cartSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        unique: [true, "Only one cart ber each user"]
    },
    products: [{
        productId: {
            type: Types.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number,
            default: 1
        },
    }]
}, {

    timestamps: true,
})

const cartModel = model('Cart', cartSchema)
export default cartModel