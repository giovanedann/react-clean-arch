import { type Validation } from 'presentation/protocols/validation'

export class ValidationStub<T = any> implements Validation<T> {
  errorMessage: string = ''

  validate(fieldName: keyof T, object: T): string {
    return this.errorMessage
  }
}
