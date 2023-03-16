import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import createAuthHeaderSut from 'tests/mocks/presentation/AuthHeader/createAuthHeaderSut'

describe('<AuthHeader /> component', () => {
  it('should clear the currentAccount key from localStorage on logout', async () => {
    const user = userEvent.setup()
    const { saveCurrentAccountMock } = createAuthHeaderSut()

    await user.click(screen.getByRole('link', { name: /logout/i }))

    expect(saveCurrentAccountMock).toHaveBeenCalledWith(null)
  })

  it('should redirect user to login', async () => {
    const user = userEvent.setup()
    createAuthHeaderSut()

    await user.click(screen.getByRole('link', { name: /logout/i }))

    expect(
      await screen.findByRole('heading', { name: /login/i })
    ).toBeInTheDocument()
  })

  it('should display the current account name on Header', () => {
    const { account } = createAuthHeaderSut()

    expect(screen.getByText(account.name)).toBeInTheDocument()
  })
})
