import { type SurveyResultAnswerModel } from 'domain/models'

export type RemoteSurveyResultModel = {
  question: string
  answers: SurveyResultAnswerModel[]
  date: string
  didAnswer: boolean
}
