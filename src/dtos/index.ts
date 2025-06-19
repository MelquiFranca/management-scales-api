export type DTOMember = {
  _id: string
  name: string
  username: string
  type: string
  birthday: Date
  groups: string[]
  groupId?: string[]
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
  id?: string
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
  _id: string
  groupId: string
  dayShift: string
  date: Date
  unavaliableMemberIds: string[]
}
export type DTOGroup = {
  _id: string
  name: string
  image?: string
  created: Date
}
export type DTOMessage = {
  text: string
  memberId: string
}
export type DTORosteredMember = {
  functionId: string
  memberIds: string[]
}
export type DTOScale = {
  _id: string
  groupId: string
  eventId: string
  messages: DTOMessage[]
  rosteredMembers: DTORosteredMember[]
}
export type DTOSubscription = {
  groups: string[]
  endpoint: string
  expirationTime: Number
  memberId: string
  keys: {
    p256dh: string
    auth: string
  }
}
export type DTOUpdateSubscription = {
  endpoint?: string
  expirationTime?: Number
  keys?: {
    p256dh: string
    auth: string
  }
}
export type DTONotification = {
  groupId: string
  eventId: string
  messages?: DTOMessage[]
  rosteredMembers?: DTORosteredMember[]
}