import crypto from 'crypto'
import { DTOCreateMember, DTORepositoryResult } from '@base/dtos'
import IRepository from '@base/repositories/repository'

export default class CreateMemberService {
  constructor (private readonly repository: IRepository) {}
  #cryptPassword (password: string): string {
      return crypto.scryptSync(password, 'salt', 64).toString('hex');
    }
  async execute (data: DTOCreateMember): Promise<DTORepositoryResult> {
    if (data.password?.length < 3) throw new Error('Invalid password')
    if (data.name?.length < 3) throw new Error('Invalid name')
    if (data.username?.length < 3) throw new Error('Invalid username')
    if (!data.groupId?.length) throw new Error('Invalid groupId')
    data.password = this.#cryptPassword(data.password)
    const { groupId, ...rest } = data
    const dataMember = {
      ...rest,
      groups: groupId ? [groupId] : [],
    }
    return this.repository.save(dataMember)
  }
}