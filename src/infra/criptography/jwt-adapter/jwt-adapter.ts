import jwt from 'jsonwebtoken'
import { Encypter } from '../../../data/protocols/criptography/encypter'

export class JwtAdapter implements Encypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
