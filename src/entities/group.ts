export default class Group {
  constructor(
    private readonly _id: string,
    readonly name: string,
    readonly image: string,
    readonly created: Date
  ) {}
  get id (): string {
    return this._id
  }
}
