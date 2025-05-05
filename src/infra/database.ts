import { DTOCreateMember, DTOMember, DTORepositoryResult } from '@base/dtos'
import { MongoClient, Db, Document, Collection, ObjectId } from 'mongodb'
import IDatabase from './idatabase'

export default class Database implements IDatabase {
  #client: MongoClient
  #db?: Db
  #databaseName: string
  constructor (uri: string, databaseName: string) {
    this.#databaseName = databaseName
    this.#client = new MongoClient(uri)
  }
  async connect () {
    await this.#client.connect()
    this.#db = this.#client.db(this.#databaseName)
  }
  async disconnect () {
    await this.#client.close()
  }
  async list<Type>(collectionName: string, filter: Object): Promise<Type[]> {
    const collection = this.#getCollection(collectionName)
    return collection.find(filter).toArray() as unknown as Type[]
  }
  async save (collectionName: string, member: DTOCreateMember): Promise<DTORepositoryResult> {
    const collection = this.#getCollection(collectionName)
    const result = await collection.insertOne(member)
    if (!result.insertedId) throw new Error('Failed to create member')
    return {
      id: result.insertedId?.toString()
    }
  }
  async remove (collectionName: string, memberId: string): Promise<DTORepositoryResult> {
    const collection = this.#getCollection(collectionName)
    const result = await collection.deleteOne({ _id: new ObjectId(memberId) })
    if (!!result.deletedCount) throw new Error('Failed to create member')
    return {
      id: memberId,
      removed: !!result.deletedCount
    }
  }
  #getCollection (name: string): Collection {
    if (!this.#db) throw new Error('Database not connected')
    return this.#db.collection(name)
  }
}