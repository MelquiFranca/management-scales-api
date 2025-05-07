import { DTOFilter } from '@base/dtos'
import Group from '@base/entities/group'
import IRepository from '@base/repositories/repository'

export default class ListGroupService {
  constructor (private readonly repository: IRepository) {}
  async execute (filter?: DTOFilter): Promise<Group[]> {
    const events = await this.repository.list<Group>(filter)
    return events.map(event => new Group(
      event.id,
      event.name,
      event.image,
      event.created
    ))
  }
} 