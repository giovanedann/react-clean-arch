import { HttpStatusCode, type HttpGetClient } from 'data/protocols/http'
import { UnexpectedError } from 'domain/errors'
import { type SurveyModel } from 'domain/models'
import { type LoadSurveyList } from 'domain/usecases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll(): Promise<any> {
    const response = await this.httpGetClient.get({ url: this.url })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        if (!response.body) {
          throw new UnexpectedError()
        }
        return response.body
      default:
        throw new UnexpectedError()
    }
  }
}
