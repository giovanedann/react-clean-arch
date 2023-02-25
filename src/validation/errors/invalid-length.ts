export class InvalidLengthError extends Error {
  constructor (label: string, minValidLength: number) {
    super(`Value provided to ${label} should have at least ${minValidLength} characters`)
    this.name = 'RequiredFieldError'
  }
}
