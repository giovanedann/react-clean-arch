import { HttpStatusCode, type HttpGetClient } from 'data/protocols/http'
import { UnexpectedError } from 'domain/errors'
import { type LoadSurveyList } from 'domain/usecases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any>
  ) {}

  async loadAll(): Promise<any> {
    const response = await this.httpGetClient.get({ url: this.url })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        break
      default:
        throw new UnexpectedError()
    }
  }
}
