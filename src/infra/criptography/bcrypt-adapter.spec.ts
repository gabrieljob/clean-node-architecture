import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'))
  },
  async compare(): Promise<boolean> {
    return new Promise((resolve) => resolve(true))
  },
}))

const salt = 12

const makeSut = () => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashedSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashedSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    jest
      .spyOn(sut, 'hash')
      .mockReturnValueOnce(new Promise((resolve) => resolve('any_value')))
    const hashedValue = await sut.hash('any_value')

    expect(hashedValue).toBe('any_value')
  })

  test('Should throws if bcrypt throws', async () => {
    const sut = makeSut()
    jest
      .spyOn(sut, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })
})
