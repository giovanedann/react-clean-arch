import { InvalidFieldError } from 'validation/errors'
import { type FieldValidation } from 'validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(email: string): InvalidFieldError | null {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isEmailValid = emailRegex.test(email) || email === ''
    return isEmailValid ? null : new InvalidFieldError(this.field)
  }
}
