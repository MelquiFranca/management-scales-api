import IRepository from './repository'
import { DTOFilter, DTORepositoryResult, DTOScale } from '@base/dtos'
import IDatabase from '@base/infra/idatabase'
import Scale from '@base/entities/scale'

export default class ScaleRepository implements IRepository {
  constructor (
    private readonly database: IDatabase,
    private readonly collectionName: string = 'scales'
  ) {}
  async save (data: DTOScale): Promise<DTORepositoryResult> {
    return this.database.save(this.collectionName, data)
  }
  async remove(id: string, filter?: Object): Promise<DTORepositoryResult> {
    return this.database.remove(this.collectionName, id, filter)
  }
  async update(id: string, data: Scale): Promise<DTORepositoryResult> {
    return Promise.resolve({ id, updated: true })
  }
  async list<DTOScale>(filter: DTOFilter): Promise<DTOScale[]> {
    return this.database.list<DTOScale>(this.collectionName, filter)
  }
  async findByQuery<DTOScale>(filter: DTOFilter, options?: Object): Promise<DTOScale|null> {
    return this.database.find<DTOScale|null>(this.collectionName, filter, options)
  }
}