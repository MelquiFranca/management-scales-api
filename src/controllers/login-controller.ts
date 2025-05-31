import IDatabase from '@base/infra/idatabase'
import { authenticate } from '@base/middlewares/authenticator'
import MemberRepository from '@base/repositories/member-repository'
import IRepository from '@base/repositories/repository'
import SubscriptionRepository from '@base/repositories/subscription-repository'
import CreateSubscriptionService from '@base/services/create-subscription-service'
import ValidatePasswordMemberService from '@base/services/validate-password-member-service'
import { Request, Response } from 'express'

export default class LoginController {
  #path = 'login'
  #repositoryMember: IRepository
  #repositorySubscription: IRepository
  constructor(database: IDatabase) {
    this.#repositoryMember = new MemberRepository(database)
    this.#repositorySubscription = new SubscriptionRepository(database)
  }
  async login (req: Request, res: Response) {
    const { body } = req
    try {
      if (!body.username?.length) throw new Error('Invalid username')
      if (!body.password?.length) throw new Error('Invalid password')
      const validatePasswordService = new ValidatePasswordMemberService(this.#repositoryMember)
      const validatedPassword = await validatePasswordService.execute({
        password: body.password,
        username: body.username,
      })
      const tokenResult = authenticate(validatedPassword)
      res.json(tokenResult)
      if (body.subscription) {
        const createSubscription = new CreateSubscriptionService(this.#repositorySubscription)
        createSubscription.execute({
          ...body.subscription,
          userId: validatedPassword._id,
          groupId: validatedPassword.groupId
        })
      }
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  get path (): string {
    return this.#path
  }
}