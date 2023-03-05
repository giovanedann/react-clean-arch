import { InvalidFieldError } from 'validation/errors'
import { type FieldValidation } from 'validation/protocols/field-validation'

export class EmailValidation<T = any> implements FieldValidation<T> {
  constructor(readonly field: keyof T) {}

  validate(object: T): InvalidFieldError | null {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isEmailValid =
      emailRegex.test(object[this.field] as string) || object[this.field] === ''

    return isEmailValid ? null : new InvalidFieldError(this.field as string)
  }
}
