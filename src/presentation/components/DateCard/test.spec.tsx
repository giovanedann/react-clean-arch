import { screen, render } from '@testing-library/react'
import DateCard from '.'

describe('<DateCard /> component', () => {
  it('should render the correct values', () => {
    const date = new Date()

    render(<DateCard date={date} />)

    expect(screen.getByText(date.getFullYear())).toBeInTheDocument()
    expect(
      screen.getByText(date.toLocaleString('en-US', { month: 'short' }))
    ).toBeInTheDocument()
    expect(screen.getByText(date.getDay())).toBeInTheDocument()
  })
})
