import { DTOFilter, DTOGroup } from '@base/dtos'
import Group from '@base/entities/group'
import IRepository from '@base/repositories/repository'

export default class ListGroupService {
  constructor (private readonly repository: IRepository) {}
  async execute (filter?: DTOFilter): Promise<Group[]> {
    const groups = await this.repository.list<DTOGroup>(filter)
    return groups.map(group => new Group(
      group._id.toString(),
      group.name,
      group.image || '',
      group.created
    ))
  }
} 