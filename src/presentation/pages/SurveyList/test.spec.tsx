import { screen } from '@testing-library/react'
import createSurveyListSut from 'tests/mocks/presentation/SurveyList/createSurveyListSut'

describe('<SurveyList /> component', () => {
  it('should present the survey list skeleton on mount', () => {
    createSurveyListSut()

    expect(screen.getByTitle(/survey list skeleton/i)).toBeInTheDocument()
  })

  it('should call loadSurveyList.loadAll on mount', () => {
    const { loadSurveyListSpy } = createSurveyListSut()

    expect(loadSurveyListSpy.calls).toEqual(1)
  })

  it('should render the survey items on loadSurveyList.loadAll success', async () => {
    const { loadSurveyListSpy } = createSurveyListSut()

    for (const survey of loadSurveyListSpy.surveys) {
      expect(await screen.findByText(survey.question)).toBeInTheDocument()
    }

    expect(screen.queryByTitle(/survey list skeleton/i)).not.toBeInTheDocument()
  })
})
