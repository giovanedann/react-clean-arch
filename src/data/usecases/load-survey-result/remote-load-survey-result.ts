import { type HttpGetClient } from 'data/protocols/http'

export default class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any>
  ) {}

  async load(): Promise<void> {
    await this.httpGetClient.get({ url: this.url })
  }
}
