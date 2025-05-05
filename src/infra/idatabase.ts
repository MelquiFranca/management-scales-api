import { DTORepositoryResult } from '@base/dtos'
import Entity from '@base/entities/entity'

export default interface IDatabase {
  connect (): Promise<any>
  disconnect (): Promise<any>
  list<Type>(repositoryName: string, data: Object): Promise<Type[]>
  save (repositoryName: string, data: Object): Promise<DTORepositoryResult>
}