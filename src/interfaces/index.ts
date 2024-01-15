export interface IFormData {
    title?: string
    authorName?: string
    content?: string
    attorney?: {
        name?: string
        email?: string
        phone?: string
    }
}

export interface IArticles {
    title: string
    body: string
}
