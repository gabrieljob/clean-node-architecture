import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const salt = 12

const makeSut = () => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashedSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashedSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hashed value on success', async () => {
    const sut = makeSut()
    jest
      .spyOn(sut, 'encrypt')
      .mockReturnValueOnce(new Promise((resolve) => resolve('any_value')))
    const hashedValue = await sut.encrypt('any_value')

    expect(hashedValue).toBe('any_value')
  })

  test('Should throws if bcrypt throws', async () => {
    const sut = makeSut()
    jest
      .spyOn(sut, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
