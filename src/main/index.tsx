import { createRoot } from 'react-dom/client'
import Router from 'presentation/components/Routes'

const container = document.getElementById('root') as HTMLElement

const root = createRoot(container)

root.render(<Router />)
