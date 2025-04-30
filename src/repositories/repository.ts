type DTOResult = {
  _id: string
}
export default interface Repository {
  save (data: Object): Promise<DTOResult>
}