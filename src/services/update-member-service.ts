import { DTOMember, DTORepositoryResult } from '@base/dtos'
import IRepository from '@base/repositories/repository'

export default class UpdateMemberService {
  constructor (private readonly repository: IRepository) {}
  async execute (id: string, data: DTOMember): Promise<DTORepositoryResult> {
    return this.repository.update(id, data)
  }
}