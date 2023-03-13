import 'jest-localstorage-mock'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import createSignUpSut from 'tests/mocks/presentation/SignUp/createSignUpSut'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}))

describe('<Login />', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should show loader during submit request', async () => {
    const user = userEvent.setup()
    createSignUpSut({})

    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByText(/loading\.../i)).toBeInTheDocument()
  })
})
