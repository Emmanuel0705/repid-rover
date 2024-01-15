// toast in react
// create toast.js component

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const options = {
    autoClose: 2000,
}

export const toastSuccess = (message: string) => {
    toast.success(message, options)
}

export const toastError = (message: string) => {
    toast.error(message, options)
}
