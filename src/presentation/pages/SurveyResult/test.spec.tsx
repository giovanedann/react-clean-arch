import { screen } from '@testing-library/react'
import createSurveyResultSut from 'tests/mocks/presentation/SurveyResult/createSurveyResultSut'

describe('<SurveyResult /> component', () => {
  it('should display the survey result skeleton on mount', () => {
    createSurveyResultSut()

    expect(screen.getByTitle(/survey result skeleton/i)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /reload/i })
    ).not.toBeInTheDocument()
  })
})
