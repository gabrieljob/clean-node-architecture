import { AccountModel } from '../../usecases/add-account/db-add-account-protocols'

export interface HashComparer {
  compare(value: string, hash: string): Promise<boolean>
}
