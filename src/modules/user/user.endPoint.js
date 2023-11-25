import { roles } from '../../../DB/models/User.model.js'

export const endPoint = {
  profile: [roles.Admin, roles.User],
}
