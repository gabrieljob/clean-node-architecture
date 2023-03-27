import { Collection, MongoClient } from 'mongodb'
import env from '../../../../main/config/env'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect(url: string = env.mongoUrl): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },

  isConnected() {
    return (
      !!this.client &&
      !!this.client.topology &&
      this.client.topology.isConnected()
    )
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.isConnected()) {
      await this.connect(this.url)
    }

    return this.client.db().collection(name)
  },
}
