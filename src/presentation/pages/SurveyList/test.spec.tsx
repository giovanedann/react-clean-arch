import { screen } from '@testing-library/react'
import createSurveyListSut from 'tests/mocks/presentation/SurveyList/createSurveyListSut'

describe('<SurveyList /> component', () => {
  it('should present the survey list skeleton on mount', () => {
    createSurveyListSut()

    expect(screen.getByTitle(/survey list skeleton/i)).toBeInTheDocument()
  })

  it('should call loadSurveyList on mount', () => {
    const { loadSurveyListSpy } = createSurveyListSut()

    expect(loadSurveyListSpy.calls).toEqual(1)
  })
})
