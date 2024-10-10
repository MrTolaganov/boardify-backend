export default class BoardDto {
  id
  title
  users
  projects
  createdAt
  constructor(model) {
    ;(this.id = model._id),
      (this.title = model.title),
      (this.users = model.users),
      (this.projects = model.projects),
      (this.createdAt = model.createdAt)
  }
}
