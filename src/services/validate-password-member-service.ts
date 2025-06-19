import crypto from 'crypto'
import IRepository from '@base/repositories/repository'
import { DTOLoginMember, DTOMember } from '@base/dtos'

export default class ValidatePasswordMemberService {
  constructor (private readonly repository: IRepository) {}
  #cryptPassword (password: string): string {
    return crypto.scryptSync(password, 'salt', 64).toString('hex');
  }
  async execute (data: DTOLoginMember): Promise<DTOMember> {
    const cryptedPassowrd = this.#cryptPassword(data.password)
    const result = await this.repository.findByQuery({ username: data.username, password: cryptedPassowrd })
    if (!result) throw new Error('Member not found OR invalid password')
    return result as DTOMember
  }
}