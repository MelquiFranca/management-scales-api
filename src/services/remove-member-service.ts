import { DTOFilter, DTORepositoryResult } from '@base/dtos'
import IRepository from '@base/repositories/repository'

export default class RemoveMemberService {
  constructor (private readonly repository: IRepository) {}
  async execute (id: string, filter?: DTOFilter): Promise<DTORepositoryResult> {
    return this.repository.remove(id, filter)
  }
}