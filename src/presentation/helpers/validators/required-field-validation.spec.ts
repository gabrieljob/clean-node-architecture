import { MissingParamError } from '../../errors'
import { RequiredFieldsValidation } from './required-fields-validation'

const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation('any_field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParam error if validation fails', async () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
  test('Should not return if validation success', async () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
