import { type SetStorage } from 'data/protocols/cache'
import { type SaveAccessToken } from 'domain/usecases'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}
