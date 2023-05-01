import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', async () => {
    class ValidationStub implements Validation {
      validate(input: any): Error {
        return new MissingParamError('any_field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ any_field: 'any_field' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
