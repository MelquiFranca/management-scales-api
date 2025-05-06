import jwt, { JwtPayload } from 'jsonwebtoken'
import {  Request, Response, NextFunction } from 'express'
import { DTOMember } from '@base/dtos'

const SECRET_PUBLIC_KEY = 'sunda'
const EXPIRES_IN = 3600

interface CustomRequest extends Request {
  token: string | JwtPayload
}
export function validate (req: Request, res: Response, next: NextFunction) {
  const { headers: { authorization } } = req
  if (!authorization?.length) {
    res.status(401).send('Not authenticated')
    return
  }
  const token = jwt.verify(authorization.replace('Bearer ', ''), SECRET_PUBLIC_KEY) as DTOMember
  (req as CustomRequest).token = token
  next()
}
export function authenticate (member: DTOMember) {
  return jwt.sign(member, SECRET_PUBLIC_KEY, { expiresIn: EXPIRES_IN })
}
