import { faker } from '@faker-js/faker'
import { render, screen } from '@testing-library/react'
import SurveyCard from '.'

describe('<SurveyCard /> component', () => {
  it('should render the right elements', () => {
    const question = faker.random.words(7)
    const date = faker.date.soon()

    render(
      <SurveyCard
        question={question}
        didAnswer={faker.datatype.boolean()}
        date={date}
      />
    )

    expect(screen.getByText(question)).toBeInTheDocument()

    expect(screen.getByText(date.getFullYear())).toBeInTheDocument()
    expect(
      screen.getByText(date.toLocaleString('en-US', { month: 'short' }))
    ).toBeInTheDocument()
    expect(screen.getByText(date.getDay())).toBeInTheDocument()
  })
})
