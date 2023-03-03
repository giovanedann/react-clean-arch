import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'
import { type UserEvent } from '@testing-library/user-event/dist/types/setup/setup'

type InputValues = {
  email: string
  password: string
}

export default async function populateValidInputs(
  user: UserEvent
): Promise<InputValues> {
  const email = faker.internet.email()
  const password = faker.internet.password()

  await user.type(screen.getByLabelText(/enter your e-mail/i), email)
  await user.type(screen.getByLabelText(/enter your password/i), password)

  return { email, password }
}
