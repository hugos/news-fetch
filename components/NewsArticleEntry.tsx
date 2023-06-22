import { NewsArticle } from "../models/NewsArticle";
import { Card } from 'react-bootstrap'
interface NewsArticleEntryProps {
    article: NewsArticle,
}

// Descructuring article object
const NewsArticleEntry = ({article: {title, description, url, urlToImage}}: NewsArticleEntryProps) => {
    
    // check if image url is valid
    const validImageUrl = (urlToImage?.startsWith('http://') || urlToImage?.startsWith('https://')) ? urlToImage : undefined;

    return ( 
        <a href={url}>
            <Card className="h-100">
                <Card.Img variant="top" src={validImageUrl} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        </a>
     );
}

export default NewsArticleEntry;