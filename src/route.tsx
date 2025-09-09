import { createBrowserRouter } from 'react-router-dom'

import Home from './pages/home'
import { Error } from './shared/components/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> }, // path="/" 와 동일
      { path: 'home', element: <Home /> }, // path="/home" 와 동일
    ],
  },
])
