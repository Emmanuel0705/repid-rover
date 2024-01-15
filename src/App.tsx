import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { loader } from './routes/home'
import { action } from './routes/create-article'
import Error from './components/Error'
import React from 'react'
import Loader from './components/Loader'

const CreateArticle = React.lazy(() => import('./routes/create-article'))
const Home = React.lazy(() => import('./routes/home'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        loader: loader,
        errorElement: <Error />,
    },
    {
        path: '/create-article',
        element: <CreateArticle />,
        action: action,
    },
])
function App() {
    return (
        <React.Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
        </React.Suspense>
    )
}

export default App
