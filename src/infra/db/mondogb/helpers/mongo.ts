import { Collection, MongoClient } from 'mongodb'
import env from '../../../../main/config/env'

export const MongoHelper = {
  client: null as MongoClient,

  async connect(url: string = env.mongoUrl): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },
}
