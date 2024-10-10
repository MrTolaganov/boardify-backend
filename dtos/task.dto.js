export default class TaskDto {
  id
  title
  checked
  project
  createdAt
  constructor(model) {
    ;(this.id = model._id),
      (this.title = model.title),
      (this.checked = model.checked),
      (this.project = model.project),
      (this.createdAt = model.createdAt)
  }
}
