import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UnexpectedError } from 'domain/errors'
import createSurveyListSut, {
  LoadSurveyListSpy
} from 'tests/mocks/presentation/SurveyList/createSurveyListSut'

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

  it('should display an error message if loadSurveyList.loadAll fails', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()

    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)

    createSurveyListSut(loadSurveyListSpy)

    expect(await screen.findByText(error.message)).toBeInTheDocument()

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('should call loadSurveyList.loadAll on reload button click', async () => {
    const user = userEvent.setup()
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()

    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)

    createSurveyListSut(loadSurveyListSpy)

    await user.click(await screen.findByRole('button', { name: /reload/i }))

    expect(loadSurveyListSpy.calls).toBe(1)
  })
})
