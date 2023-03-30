export type SurveyResultAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}

export type SurveyResultModel = {
  question: string
  answers: SurveyResultAnswerModel[]
  date: Date
  didAnswer: boolean
}
