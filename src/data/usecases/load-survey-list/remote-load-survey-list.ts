import { HttpStatusCode, type HttpGetClient } from 'data/protocols/http'
import { UnexpectedError } from 'domain/errors'
import { type LoadSurveyList } from 'domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const response = await this.httpGetClient.get({ url: this.url })

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
