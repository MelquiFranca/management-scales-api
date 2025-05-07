import IDatabase from '@base/infra/idatabase'
import { authenticate } from '@base/middlewares/authenticator'
import MemberRepository from '@base/repositories/member-repository'
import IRepository from '@base/repositories/repository'
import ValidatePasswordMemberService from '@base/services/validate-password-member-service'
import { Request, Response } from 'express'

export default class LoginController {
  #path = 'login'
  #repository: IRepository
  constructor(database: IDatabase) {
    this.#repository = new MemberRepository(database)
  }
  async login (req: Request, res: Response) {
    const { body } = req
    try {
      if (!body.username?.length) throw new Error('Invalid username')
      if (!body.password?.length) throw new Error('Invalid password')
      const validatePasswordService = new ValidatePasswordMemberService(this.#repository)
      const result = await validatePasswordService.execute({
        password: body.password,
        username: body.username,
      })
      const tokenResult = authenticate(result)
      res.json(tokenResult)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  get path (): string {
    return this.#path
  }
}