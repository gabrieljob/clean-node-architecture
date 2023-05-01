import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('any_field', 'any_field_to_compare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParam error if validation fails', async () => {
    const sut = makeSut()
    const error = sut.validate({
      any_field: 'any_field',
      any_field_to_compare: 'wrong_value',
    })
    expect(error).toEqual(new InvalidParamError('any_field_to_compare'))
  })
  test('Should not return if validation success', async () => {
    const sut = makeSut()
    const error = sut.validate({
      any_field: 'any_field',
      any_field_to_compare: 'any_field',
    })
    expect(error).toBeFalsy()
  })
})
