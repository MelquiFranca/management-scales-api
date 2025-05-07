import { DTOGroup, DTORepositoryResult } from '@base/dtos'
import IRepository from '@base/repositories/repository'

export default class CreateGroupService {
  constructor (private readonly repository: IRepository) {}
  async execute (data: DTOGroup): Promise<DTORepositoryResult> {
    if (!data.name) throw new Error('Invalid name')
    if (data.image && data.image?.length < 3) throw new Error('Invalid image')
    data.created = new Date()
    return this.repository.save(data)
  }
}