import { type HttpGetClient } from 'data/protocols/http'
import { type LoadSurveyList } from 'domain/usecases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll(): Promise<any> {
    await this.httpGetClient.get({ url: this.url })
  }
}
