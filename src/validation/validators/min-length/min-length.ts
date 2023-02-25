import { InvalidLengthError } from 'validation/errors'
import { FieldValidation } from 'validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minValidLength: number) {}

  validate(value: string): Error | null {
    return value.length >= this.minValidLength ? null : new InvalidLengthError(this.field, this.minValidLength)
  }
}
