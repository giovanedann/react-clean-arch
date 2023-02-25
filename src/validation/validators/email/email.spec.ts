import { InvalidFieldError } from 'validation/errors'
import { EmailValidation } from 'validation/validators/email/email'

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('invalidemail')
    expect(error).toBeInstanceOf(InvalidFieldError)
  })
})
