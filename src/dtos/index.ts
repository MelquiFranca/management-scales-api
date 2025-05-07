export type DTOMember = {
  _id: string
  name: string
  username: string
  type: string
  birthday: Date
  groupId: string
  password?: string
  photo?: string
}
export type DTOCreateMember = {
  id?: string
  name: string
  username: string
  type: string
  birthday: Date
  password: string
  groupId: string
  photo?: string
}
export type DTORepositoryResult = {
  id: string
  removed?: boolean
  updated?: boolean
}
export type DTOFilter = {
  groupId?: string
}
export type DTOLoginMember = {
  username: string
  password: string
}
export type DTOEvent = {
  groupId: string
  dayShift: string
  date: Date
  unavaliableMemberIds: string[]
}
export type DTOGroup = {
  name: string
  image?: string
  created?: Date
}