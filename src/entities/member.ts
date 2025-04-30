import Entity from './entity'

export default class Member implements Entity {
  constructor(
    private readonly _id: string,
    private name: string,
    private username: string,
    private birthday: Date,
    private photo?: string,
  ) {}
  get id (): string {
    return this._id
  }
}