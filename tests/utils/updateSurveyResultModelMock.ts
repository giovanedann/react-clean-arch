import { type SurveyResultModel } from 'domain/models'

export default function updateSurveyResultModelMock(
  surveyResult: SurveyResultModel
): SurveyResultModel {
  const updatedAnswers = surveyResult.answers.map((item) => {
    if (item.isCurrentAccountAnswer) {
      return { ...item, isCurrentAccountAnswer: false }
    }

    return { ...item, isCurrentAccountAnswer: true }
  })

  return {
    ...surveyResult,
    answers: updatedAnswers
  }
}
