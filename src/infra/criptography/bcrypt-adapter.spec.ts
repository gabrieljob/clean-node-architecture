import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashedSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashedSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hashed value on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    jest
      .spyOn(sut, 'encrypt')
      .mockReturnValueOnce(new Promise((resolve) => resolve('any_value')))
    const hashedValue = await sut.encrypt('any_value')

    expect(hashedValue).toBe('any_value')
  })
})
