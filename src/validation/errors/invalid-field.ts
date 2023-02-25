export class InvalidFieldError extends Error {
  constructor(label: string) {
    super(`Value provided to ${label} is invalid`)
    this.name = 'InvalidFieldError'
  }
}
