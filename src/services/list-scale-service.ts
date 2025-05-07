import { DTOFilter } from '@base/dtos'
import Scale from '@base/entities/scale'
import IRepository from '@base/repositories/repository'

export default class ListScaleService {
  constructor (private readonly repository: IRepository) {}
  async execute (filter?: DTOFilter): Promise<Scale[]> {
    const events = await this.repository.list<Scale>(filter)
    return events.map(event => new Scale(
      event.id,
      event.groupId,
      event.eventId,
      event.messages,
      event.rosteredMembers
    ))
  }
} 