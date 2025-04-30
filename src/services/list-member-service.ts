import { DTOFilter } from '@base/dtos'
import Member from '@base/entities/member'
import IRepository from '@base/repositories/repository'

export default class ListMemberService {
  constructor (private readonly repository: IRepository) {}
  execute (filter: DTOFilter): Promise<Member[]> {
    return this.repository.list(filter)
  }
} 