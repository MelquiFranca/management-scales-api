import Database from '@base/infra/database'
import IDatabase from '@base/infra/idatabase'
import MemberRepository from '@base/repositories/member-repository'
import IRepository from '@base/repositories/repository'
import CreateMemberService from '@base/services/create-member-service'
import ListMemberService from '@base/services/list-member-service'
import { Request, Response } from 'express'

export default class MemberController {
  #collectionName = 'members'
  #repository: IRepository
  constructor (database: IDatabase) {
    this.#repository = new MemberRepository(database, this.path)
  }
  async create (req: Request, res: Response) {
    const { body } = req
    const createMemberService = new CreateMemberService(this.#repository)
    const created = await createMemberService.execute(body)
    res.send({ created })
  }
  async list (req: Request, res: Response) {
    const listMemberService = new ListMemberService(this.#repository)
    const members = await listMemberService.execute()
    res.send({ members })
  }
  get path () {
    return this.#collectionName
  }
}
