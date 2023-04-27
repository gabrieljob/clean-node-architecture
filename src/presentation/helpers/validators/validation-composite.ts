import { Validation } from './validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  /**
   *
   * @param input
   *
   * @description input param on function receives a body HttpRequest
   *
   * @returns null or Error
   */
  validate(input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)

      if (error) return error
    }
  }
}
