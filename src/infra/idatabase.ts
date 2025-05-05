import Entity from '@base/entities/entity'

export default interface IDatabase {
  connect (): Promise<any>
  disconnect (): Promise<any>
  list (repositoryName: string, data: Object): Promise<Entity[]>
  save (repositoryName: string, data: Object): Promise<Object>
}