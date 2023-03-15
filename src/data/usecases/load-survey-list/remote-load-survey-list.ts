import { HttpStatusCode, type HttpGetClient } from 'data/protocols/http'
import { UnexpectedError } from 'domain/errors'
import { type LoadSurveyList } from 'domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<any> {
    const response = await this.httpGetClient.get({ url: this.url })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        if (!response.body) {
          throw new UnexpectedError()
        }
        return response.body
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model
}
