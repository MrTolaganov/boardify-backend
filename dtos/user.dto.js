export default class UserDto {
  id
  username
  email
  isAdmin
  createdAt
  boards
  constructor(model) {
    ;(this.id = model._id),
      (this.username = model.username),
      (this.email = model.email),
      (this.isAdmin = model.isAdmin),
      (this.createdAt = model.createdAt),
      (this.boards = model.boards)
  }
}
