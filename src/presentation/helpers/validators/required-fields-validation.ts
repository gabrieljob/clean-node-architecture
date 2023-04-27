import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldsValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  /**
   *
   * @param input
   *
   * @description input param on function receives a body HttpRequest
   *
   * @returns null or Error
   */
  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
