import { render } from '@testing-library/react'
import SurveyResult from 'presentation/pages/SurveyResult'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ApiContext } from 'presentation/contexts/api'
import { mockAccountModel } from 'tests/mocks/domain/models/account'

export default function createSurveyResultSut(): void {
  const saveCurrentAccount = jest.fn()

  render(
    <MemoryRouter initialEntries={['/surveys']}>
      <ApiContext.Provider
        value={{
          saveCurrentAccount,
          getCurrentAccount: jest.fn(() => mockAccountModel())
        }}
      >
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="surveys" element={<SurveyResult />} />
        </Routes>
      </ApiContext.Provider>
    </MemoryRouter>
  )
}
