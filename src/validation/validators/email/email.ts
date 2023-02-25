import { InvalidFieldError } from 'validation/errors'
import { FieldValidation } from 'validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(email: string): InvalidFieldError | null {
    return new InvalidFieldError('email')
  }
}
