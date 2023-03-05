import { type FieldValidation } from 'validation/protocols/field-validation'

export class FieldValidationSpy<T = any> implements FieldValidation<T> {
  error: Error | null = null

  constructor(readonly field: keyof T) {}

  validate(object: T): Error | null {
    return this.error
  }
}
