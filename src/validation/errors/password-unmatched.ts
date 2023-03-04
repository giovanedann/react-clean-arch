export class PasswordsNotMatchError extends Error {
  constructor() {
    super('Passwords not matching')
    this.name = 'PasswordsNotMatchError'
  }
}
