import { DTOFilter, DTOScale } from '@base/dtos'
import Scale from '@base/entities/scale'
import IRepository from '@base/repositories/repository'

export default class ListScaleService {
  constructor (private readonly repository: IRepository) {}
  async execute (filter?: DTOFilter): Promise<Scale[]> {
    const query = {
      ...(filter?.groupId && { groupId: { $in: [filter.groupId] } })
    }
    const scales = await this.repository.list<DTOScale>(query)
    return scales.map(scale => new Scale(
      scale._id.toString(),
      scale.groupId,
      scale.eventId,
      scale.messages,
      scale.rosteredMembers
    ))
  }
} 