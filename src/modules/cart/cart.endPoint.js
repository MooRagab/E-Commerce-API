import { roles } from '../../../DB/models/User.model.js'

const endPoint = {
  add: [roles.Admin, roles.User],
}

export default endPoint
