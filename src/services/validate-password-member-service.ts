import crypto from 'crypto'
import IRepository from '@base/repositories/repository'
import { DTOLoginMember, DTOMember } from '@base/dtos'

const SECRET_PUBLIC_KEY = 'teste'
export default class ValidatePasswordMemberService {
  constructor (private readonly repository: IRepository) {}
  #cryptPassword (password: string): string {
    return crypto.scryptSync(password, 'salt', 64).toString('hex');
  }
  async execute (data: DTOLoginMember): Promise<DTOMember> {
    const cryptedPassowrd = this.#cryptPassword(data.password)
    const result = await this.repository.findByQuery<DTOMember>({ username: data.username, password: cryptedPassowrd })
    if (!result) throw new Error('Member not found OR invalid password')
    return {
      _id: result._id.toString(),
      name: result.name,
      username: result.username,
      photo: result.photo,
      type: result.type,
      groupId: result.groupId
    } as DTOMember
  }
}