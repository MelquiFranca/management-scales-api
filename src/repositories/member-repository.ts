import Member from '@base/entities/member'
import IRepository from './repository'
import { DTOFilter, DTOLoginMember, DTOMember, DTORepositoryResult } from '@base/dtos'
import IDatabase from '@base/infra/idatabase'

export default class MemberRepository implements IRepository {
  constructor (
    private readonly database: IDatabase,
    private readonly collectionName: string = 'members'
  ) {}
  async save (data: DTOMember): Promise<DTORepositoryResult> {
    return this.database.save(this.collectionName, data)
  }
  async remove(id: string, filter?: Object): Promise<DTORepositoryResult> {
    return this.database.remove(this.collectionName, id, filter)
  }
  async update(data: Member): Promise<DTORepositoryResult> {
    return Promise.resolve({ id: data.id, updated: true })
  }
  async list<DTOMember>(filter: DTOFilter): Promise<DTOMember[]> {
    return this.database.list<DTOMember>(this.collectionName, filter)
  }
  async findByQuery<DTOMember>(filter: DTOLoginMember, options?: Object): Promise<DTOMember|null> {
    return this.database.find<DTOMember|null>(this.collectionName, filter, options)
  }
}