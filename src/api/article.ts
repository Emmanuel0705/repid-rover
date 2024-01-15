import axios from 'axios'
import { IFormData } from '../interfaces'

export type ResType = {
    success?: boolean
    message?: string
    body?: any
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/'

class APIManager {
    constructor() {
        axios.defaults = Object.assign(axios.defaults, {
            baseURL: BASE_URL,
        })
    }

    async createArticle(payload: IFormData): Promise<ResType> {
        try {
            const res = await axios.post(`posts`, {
                body: JSON.stringify(payload),
            })

            return { success: true, ...res.data }
        } catch (error) {
            return {
                success: false,
                message:
                    (error as any).response?.data?.message ||
                    (error as any).response?.data ||
                    (error as any).message,
            }
        }
    }
    async searchArticles(query?: string | null): Promise<ResType | []> {
        try {
            if (!query) return []
            const res = await axios.get(`posts?=user=1`)

            return res.data
        } catch (error) {
            return {
                success: false,
                message:
                    (error as any).response?.data?.message ||
                    (error as any).response?.data ||
                    (error as any).message,
            }
        }
    }
}

export default APIManager
