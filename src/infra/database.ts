import { DTOMember, DTORepositoryResult } from '@base/dtos'
import { MongoClient, Db, Document, Collection, UpdateResult } from 'mongodb'

export default class Database {
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
  list (collectionName: string, filter: Object): Promise<Document[]> {
    const collection = this.#getCollection(collectionName)
    return collection.find(filter).toArray()
  }
  async save (collectionName: string, member: DTOMember): Promise<DTORepositoryResult> {
    const collection = this.#getCollection(collectionName)
    const result = await collection.insertOne(member)
    if (!result.insertedId) throw new Error('Failed to create member')
    return {
      id: result.insertedId?.toString()
    }
  }
  #getCollection (name: string): Collection {
    if (!this.#db) throw new Error('Database not connected')
    return this.#db.collection(name)
  }
}