export type DTOMember = {
  id: string,
  name: string,
  username: string,
  type: string,
  birthday: Date,
  password?: string,
  photo?: string
}
export type DTOCreateMember = {
  id?: string,
  name: string,
  username: string,
  type: string,
  birthday: Date,
  password: string,
  groupId: string
  photo?: string,
}

export type DTORepositoryResult = {
  id: string,
  removed?: boolean,
  updated?: boolean
}

export type DTOFilter = {
  groupId?: string
}