import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home, { loader } from './routes/home'
import CreateArticle, { action } from './routes/create-article'
import APIManager from './api/article'
import Error from './components/Error'

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
    return <RouterProvider router={router} />
}

export default App
