import { render } from '@testing-library/react'
import SurveyList from 'presentation/pages/SurveyList'

export default function createSurveyListSut(): any {
  render(<SurveyList />)
}
