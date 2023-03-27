import { MongoHelper } from '../infra/db/mondogb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`server running at ${env.port}`))
  })
  .catch(console.error)
