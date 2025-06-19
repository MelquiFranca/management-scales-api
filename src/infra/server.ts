import cors from 'cors'
import express from 'express'

const app = express()
app.use(express.json({
  limit: '50mb' // Increase the limit for larger payloads
}))
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

export default app
