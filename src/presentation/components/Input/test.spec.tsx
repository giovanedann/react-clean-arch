import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '.'

describe('<Input /> component', () => {
  it('should not display a title on the circle if the input value is valid', async () => {
    const user = userEvent.setup()
    const placeholder = faker.random.word()
    render(<Input placeholder={placeholder} />)

    await user.type(screen.getByPlaceholderText(placeholder), 'test')

    expect(screen.getByText(/🟢/i)).toBeInTheDocument()
    expect(screen.getByText(/🟢/i).title).toBeFalsy()
    expect(screen.getByText(/🟢/i).title).toBe('')
  })

  it('should not display a title on the circle if the input value is valid', async () => {
    const user = userEvent.setup()
    const placeholder = faker.random.word()
    const errorMessage = faker.random.words()
    render(<Input placeholder={placeholder} errorMessage={errorMessage} />)

    await user.type(
      screen.getByPlaceholderText(placeholder),
      faker.random.words()
    )

    expect(screen.getByText(/🔴/i)).toBeInTheDocument()
    expect(screen.getByText(/🔴/i).title).toBe(errorMessage)
  })
})
