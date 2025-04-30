import { DTOMember, DTOSavedMember } from '@base/dtos'
import IRepository from '@base/repositories/repository'

export default class CreateMemberService {
  constructor (private readonly repository: IRepository) {}
  async execute (data: DTOMember): Promise<DTOSavedMember> {
    const result = await this.repository.save(data)
    return { id: result._id }
  }
}