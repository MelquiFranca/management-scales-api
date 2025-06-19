import { DTORepositoryResult } from '@base/dtos'

export default interface IDatabase {
  connect (): Promise<any>
  disconnect (): Promise<any>
  list<Type>(repositoryName: string, data: Object): Promise<Type[]>
  find<Type>(repositoryName: string, data: Object, options?: Object): Promise<Type|null>
  save (repositoryName: string, data: Object): Promise<DTORepositoryResult>
  update(repositoryName: string, filter: Object, updateData: Object): Promise<DTORepositoryResult>
  remove (repositoryName: string, data: Object, filter?: Object): Promise<DTORepositoryResult>
}