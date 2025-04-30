export type DTOMember = {
  name: string,
  username: string,
  type: string,
  password: string,
  photo?: string
}

export type DTORepositoryResult = {
  id: string,
  removed?: boolean
}
