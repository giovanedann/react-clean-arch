import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '.'

describe('<Input /> component', () => {
  it('should not display a title on the circle if the input value is valid', async () => {
    const user = userEvent.setup()
    const placeholder = faker.random.word()
    render(<Input placeholder={placeholder} name={faker.random.word()} />)

    const input = screen.getByLabelText(placeholder)

    await user.type(input, 'test')

    const label = input.nextElementSibling as HTMLLabelElement

    expect(label.title).toBeFalsy()
    expect(label.title).toBe('')
  })

  it('should not display a title on the circle if the input value is valid', async () => {
    const user = userEvent.setup()
    const placeholder = faker.random.word()
    const errorMessage = faker.random.words()
    render(
      <Input
        placeholder={placeholder}
        errorMessage={errorMessage}
        name={faker.random.word()}
      />
    )

    await user.type(screen.getByLabelText(placeholder), faker.random.words())

    expect(screen.getByTitle(errorMessage)).toBeInTheDocument()
  })
})
