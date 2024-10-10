export default class ProjectDto {
  id
  title
  description
  body
  level
  progress
  board
  tasks
  createdAt
  constructor(model) {
    ;(this.id = model._id),
      (this.title = model.title),
      (this.description = model.description),
      (this.level = model.level),
      (this.progress = model.progress),
      (this.board = model.board),
      (this.tasks = model.tasks),
      (this.createdAt = model.createdAt)
  }
}
