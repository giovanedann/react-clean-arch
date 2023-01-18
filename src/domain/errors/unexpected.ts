export class UnexpectedError extends Error {
  constructor () {
    super('An unexpected error has occurred')
    this.name = 'UnexpectedError'
  }
}
