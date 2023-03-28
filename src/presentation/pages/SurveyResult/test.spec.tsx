import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { UnexpectedError } from 'domain/errors'
import { LoadSurveyResultSpy } from 'tests/mocks/domain/models/load-survey-result'
import createSurveyResultSut from 'tests/mocks/presentation/SurveyResult/createSurveyResultSut'

describe('<SurveyResult /> component', () => {
  it('should display the survey result skeleton on mount', () => {
    createSurveyResultSut()

    expect(screen.getByTitle(/survey result skeleton/i)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /reload/i })
    ).not.toBeInTheDocument()
  })

  it('should call LoadSurveyResult.load on mount', () => {
    const { loadSurveyResultSpy } = createSurveyResultSut()

    expect(loadSurveyResultSpy.calls).toEqual(1)
  })

  it('should display the survey result if LoadSurveyResult succeeds', async () => {
    const { surveyResultMock } = createSurveyResultSut()

    await waitForElementToBeRemoved(
      screen.getByTitle(/survey result skeleton/i)
    )

    expect(screen.getByText(surveyResultMock.question)).toBeInTheDocument()

    expect(
      screen.getByText(surveyResultMock.date.getFullYear())
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        surveyResultMock.date.toLocaleString('en-US', { month: 'short' })
      )
    ).toBeInTheDocument()
    expect(screen.getByText(surveyResultMock.date.getDay())).toBeInTheDocument()

    surveyResultMock.answers.forEach((answer, index) => {
      if (index === 0) {
        // first answer test, the one with image
        expect(screen.getByText(answer.answer)).toBeInTheDocument()
        expect(screen.getByText(`${answer.percent}%`)).toBeInTheDocument()

        expect(
          screen.getByRole('img', {
            name: `${answer.answer} representative image`
          })
        ).toBeInTheDocument()

        expect(screen.getByText(answer.answer).parentElement).toHaveClass(
          'voted'
        )
      }

      if (index === 1) {
        // second answer test, the one without image
        expect(screen.getByText(answer.answer)).toBeInTheDocument()
        expect(screen.getByText(`${answer.percent}%`)).toBeInTheDocument()

        expect(
          screen.queryByRole('img', {
            name: `${answer.answer} representative image`
          })
        ).not.toBeInTheDocument()

        expect(screen.getByText(answer.answer).parentElement).not.toHaveClass(
          'voted'
        )
      }
    })
  })

  it('should display an error message if LoadSurveyResult.load fails', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()

    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)

    createSurveyResultSut(loadSurveyResultSpy)

    expect(await screen.findByText(error.message)).toBeInTheDocument()

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
