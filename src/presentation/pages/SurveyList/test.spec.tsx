import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SurveyList from '.'

describe('<SurveyList /> component', () => {
  it('should present the survey list skeleton on mount', () => {
    render(<SurveyList />)

    expect(screen.getByTitle(/survey list skeleton/i)).toBeInTheDocument()
  })
})
