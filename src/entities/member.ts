import Entity from './entity'

export default class Member implements Entity {
  constructor(
    private readonly _id: string,
    readonly name: string,
    readonly username: string,
    readonly birthday: Date,
    readonly photo?: string,
    private password?: string,
  ) {}
  get id (): string {
    return this._id
  }
}