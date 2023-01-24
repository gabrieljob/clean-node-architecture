import express from 'express'
import setupMiddlewares from './middlewares'
import setupRouts from './routes'

const app = express()
setupMiddlewares(app)
setupRouts(app)
export default app
