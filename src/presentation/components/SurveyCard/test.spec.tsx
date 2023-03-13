import { render, screen } from '@testing-library/react'
import { mockLoadSurveyItem } from 'tests/mocks/data/protocols/http/http-get-client'
import SurveyCard from '.'

describe('<SurveyCard /> component', () => {
  it('should render the right elements', () => {
    const { question, date, didAnswer } = mockLoadSurveyItem()

    render(<SurveyCard question={question} didAnswer={didAnswer} date={date} />)

    expect(screen.getByText(question)).toBeInTheDocument()

    expect(screen.getByText(date.getFullYear())).toBeInTheDocument()
    expect(
      screen.getByText(date.toLocaleString('en-US', { month: 'short' }))
    ).toBeInTheDocument()
    expect(screen.getByText(date.getDay())).toBeInTheDocument()
  })

  it('should change the question status if question is answered', () => {
    const { question, date } = mockLoadSurveyItem()

    const { rerender } = render(
      <SurveyCard question={question} didAnswer={false} date={date} />
    )

    expect(screen.getByTitle(/status icon/i).parentElement).toHaveAttribute(
      'class',
      'icon notAnswered'
    )

    rerender(<SurveyCard question={question} didAnswer={true} date={date} />)

    expect(screen.getByTitle(/status icon/i).parentElement).toHaveAttribute(
      'class',
      'icon'
    )
  })
})
