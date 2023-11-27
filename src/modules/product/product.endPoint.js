import { roles } from '../../../DB/models/User.model.js'

const endPoint = {
  add: [roles.Admin, roles.User, roles.HR],
  update: [roles.Admin, roles.User, roles.HR],
}

export default endPoint
