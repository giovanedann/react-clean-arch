import { PasswordsNotMatchError } from 'validation/errors/password-unmatched'
import { type FieldValidation } from 'validation/protocols/field-validation'

export class CompareFieldsValidation<T = any> implements FieldValidation<T> {
  constructor(readonly field: keyof T, private readonly compareWith: keyof T) {}

  validate(object: T): Error | null {
    return object[this.field] === object[this.compareWith]
      ? null
      : new PasswordsNotMatchError()
  }
}
