import { NewsArticle } from "../models/NewsArticle";

interface NewsArticleEntryProps {
    article: NewsArticle,
}

// Descructuring article object
const NewsArticleEntry = ({article: {title, description, url, urlToImage}}: NewsArticleEntryProps) => {
    return ( 

     );
}
 
interface NewsArticleEntry

export default NewsArticleEntry;