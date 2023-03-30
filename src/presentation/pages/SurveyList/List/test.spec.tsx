import { render, screen } from '@testing-library/react'
import { mockLoadSurveyList } from 'tests/mocks/data/protocols/http/http-client'
import List from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))

describe('[SurveyList] - <List /> component', () => {
  it('should render the items', () => {
    const items = mockLoadSurveyList()

    render(<List surveys={items} />)

    items.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument()
    })
  })
})
