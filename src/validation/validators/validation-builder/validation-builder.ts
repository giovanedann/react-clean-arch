import { type FieldValidation } from 'validation/protocols/field-validation'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from 'validation/validators'
import { CompareFieldsValidation } from '../compare-fields/compare-fields'

export class ValidationBuilder<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly validations: Array<FieldValidation<T>>
  ) {}

  static field(fieldName: string): ValidationBuilder<any> {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder<T> {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email(): ValidationBuilder<T> {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  minLength(minValidLength: number): ValidationBuilder<T> {
    this.validations.push(
      new MinLengthValidation(this.fieldName, minValidLength)
    )
    return this
  }

  compareWithField(fieldToCompare: keyof T): ValidationBuilder<T> {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare)
    )
    return this
  }

  build(): Array<FieldValidation<T>> {
    return this.validations
  }
}
