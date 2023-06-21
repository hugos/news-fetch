// Setting up interface because of Typescript
export interface NewsArticle {
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage?: string, // ? means its optional
    publishedAt: string,
    content: string
}

export interface NewsResponse {
    articles: NewsArticle[], // an array of our news article
}