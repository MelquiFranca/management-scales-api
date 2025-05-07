import Member from '@base/entities/member'
import IRepository from './repository'
import { DTOEvent, DTOFilter, DTORepositoryResult } from '@base/dtos'
import IDatabase from '@base/infra/idatabase'

export default class GroupRepository implements IRepository {
  constructor (
    private readonly database: IDatabase,
    private readonly collectionName: string = 'groups'
  ) {}
  async save (data: DTOEvent): Promise<DTORepositoryResult> {
    return this.database.save(this.collectionName, data)
  }
  async remove(id: string, filter?: Object): Promise<DTORepositoryResult> {
    return this.database.remove(this.collectionName, id, filter)
  }
  async update(data: Member): Promise<DTORepositoryResult> {
    return Promise.resolve({ id: data.id, updated: true })
  }
  async list<DTOEvent>(filter: DTOFilter): Promise<DTOEvent[]> {
    return this.database.list<DTOEvent>(this.collectionName, filter)
  }
  async findByQuery<DTOEvent>(filter: DTOFilter, options?: Object): Promise<DTOEvent|null> {
    return this.database.find<DTOEvent|null>(this.collectionName, filter, options)
  }
}