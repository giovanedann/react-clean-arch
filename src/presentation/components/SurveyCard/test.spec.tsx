import { render, screen } from '@testing-library/react'
import { mockLoadSurveyItem } from 'tests/mocks/data/protocols/http/http-get-client'
import SurveyCard from '.'
import userEvent from '@testing-library/user-event'

const useNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigate
}))

describe('<SurveyCard /> component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should render the right elements', () => {
    const { question, date, didAnswer, id } = mockLoadSurveyItem()

    render(
      <SurveyCard
        question={question}
        didAnswer={didAnswer}
        date={date}
        id={id}
      />
    )

    expect(screen.getByText(question)).toBeInTheDocument()

    expect(screen.getByText(date.getFullYear())).toBeInTheDocument()
    expect(
      screen.getByText(date.toLocaleString('en-US', { month: 'short' }))
    ).toBeInTheDocument()
    expect(screen.getByText(date.getDay())).toBeInTheDocument()
  })

  it('should change the question status if question is answered', () => {
    const { question, date, id } = mockLoadSurveyItem()

    const { rerender } = render(
      <SurveyCard id={id} question={question} didAnswer={false} date={date} />
    )

    expect(screen.getByTitle(/status icon/i).parentElement).toHaveAttribute(
      'class',
      'icon notAnswered'
    )

    rerender(
      <SurveyCard id={id} question={question} didAnswer={true} date={date} />
    )

    expect(screen.getByTitle(/status icon/i).parentElement).toHaveAttribute(
      'class',
      'icon'
    )
  })

  it('should call navigate with correct endpoint', async () => {
    const { id, question, date } = mockLoadSurveyItem()
    const user = userEvent.setup()

    render(
      <SurveyCard id={id} question={question} didAnswer={false} date={date} />
    )

    await user.click(screen.getByText(/see results/i))

    expect(useNavigate).toHaveBeenCalledWith(`/surveys/${id}`)
  })
})
