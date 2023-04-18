import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import {
  badRequest,
  serverError,
  unauthorized,
} from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      const { email, password } = httpRequest.body
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accesToken = await this.authentication.auth(email, password)
      if (!accesToken) {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
