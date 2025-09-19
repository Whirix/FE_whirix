import { createBrowserRouter } from 'react-router-dom'

import Main from './pages/main'
import Game from './pages/game'
import { Error } from './shared/components/error'
import { Layout } from './shared/layout/layout'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Main /> }, // path="/" 와 동일
      { path: 'main', element: <Main /> }, // path="/home" 와 동일
      { path: 'game', element: <Game /> },
    ],
  },
])
