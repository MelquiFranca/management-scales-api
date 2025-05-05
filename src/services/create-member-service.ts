import crypto, { Hash } from 'crypto'
import { DTOCreateMember, DTORepositoryResult } from '@base/dtos'
import IRepository from '@base/repositories/repository'

export default class CreateMemberService {
  constructor (private readonly repository: IRepository) {}
  #cryptPassword (password: string): string {
    return password
  }
  async execute (data: DTOCreateMember): Promise<DTORepositoryResult> {
    if (data.password?.length < 3) throw new Error('Invalid password')
    if (data.name?.length < 3) throw new Error('Invalid name')
    if (data.username?.length < 3) throw new Error('Invalid username')
    data.password = this.#cryptPassword(data.password)
    return this.repository.save(data)
  }
}