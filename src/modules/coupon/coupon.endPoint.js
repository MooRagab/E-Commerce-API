import { roles } from "../../../DB/models/User.model.js";



export const endPoint = {
    createCoupon: [roles.Admin],
    updateCoupon: [roles.Admin],
    deleteCoupon: [roles.Admin]
}