import { DTOCreateMember, DTOFilter, DTORepositoryResult } from '@base/dtos'
import { MongoClient, Db, Collection, ObjectId, Document } from 'mongodb'
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
  async update(collectionName: string, filter: Object, updateData: Object, upsert: boolean = false): Promise<DTORepositoryResult> {
    const collection = this.#getCollection(collectionName)
    const result = await collection.updateOne(filter, updateData, { upsert })
    if (!result.acknowledged) throw new Error('Failed to update member')
    return {
      id: result.upsertedId?.toString(),
      updated: true
    }
  }
  async remove (collectionName: string, id: string, filter?: DTOFilter): Promise<DTORepositoryResult> {
    const collection = this.#getCollection(collectionName)
    const result = await collection.deleteOne({ _id: new ObjectId(id), ...filter })
    if (!result?.deletedCount) throw new Error('Failed to remove member')
    return {
      id,
      removed: !!result.deletedCount
    }
  }
  async find<Type>(collectionName: string, filter: Object, options?: Object): Promise<Type|null> {
    const collection = this.#getCollection(collectionName)
    return collection.findOne(filter, options)
  }
  #getCollection (name: string): Collection {
    if (!this.#db) throw new Error('Database not connected')
    return this.#db.collection(name)
  }
}