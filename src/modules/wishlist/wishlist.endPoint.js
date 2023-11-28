import { roles } from '../../../DB/models/User.model.js'

export const endPoint = {
  add: [roles.User],
  remove: [roles.User],
}
