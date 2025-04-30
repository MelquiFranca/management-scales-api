export type DTOMember = {
  id?: string,
  name: string,
  username: string,
  type: string,
  password?: string,
  photo?: string
}

export type DTORepositoryResult = {
  id: string,
  removed?: boolean,
  updated?: boolean
}

export type DTOFilter = {
  groupId?: string
}