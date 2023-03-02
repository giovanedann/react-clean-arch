import { type Validation } from 'presentation/protocols/validation'

export class ValidationStub implements Validation<any> {
  errorMessage: string = ''

  validate(fieldName: string, fieldValue: string): string {
    return this.errorMessage
  }
}
