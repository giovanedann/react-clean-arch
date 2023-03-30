import { HttpStatusCode, type HttpClient } from 'data/protocols/http'
import { AccessDeniedError, UnexpectedError } from 'domain/errors'
import { type LoadSurveyList } from 'domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const response = await this.httpGetClient.request({
      method: 'get',
      url: this.url
    })

    const remoteSurveys = response.body

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        if (!remoteSurveys) {
          throw new UnexpectedError()
        }

        return remoteSurveys.map((item) => ({
          ...item,
          date: new Date(item.date)
        }))
      case HttpStatusCode.noContent:
        return []
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string
    question: string
    date: string
    didAnswer: boolean
    answers: LoadSurveyList.Answer[]
  }
}
