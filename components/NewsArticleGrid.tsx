import { Col, Row } from "react-bootstrap";
import { NewsArticle } from "../models/NewsArticle";
import NewsArticleEntry from "./NewsArticleEntry";

interface NewsArticleGridProps {
    articles: NewsArticle[];
}

/* Filtering the Articles array to check if they have valid images
   Only those will be processed and rendered on the DOM.
*/ 
const NewsArticleGrid = ({ articles }: NewsArticleGridProps) => {
    const validArticles = articles.filter((article) => {
        const validImageUrl =
        article.urlToImage?.startsWith("http://") ||
        article.urlToImage?.startsWith("https://");
        return validImageUrl;
    });

    return ( 
        <Row xs={1} sm={2} xl={4} className="g-4">
            {validArticles.map(article => (
                <Col key={article.url}>
                    <NewsArticleEntry article={article}/>
                </Col>

            ))}
        </Row>
     );
}
 
export default NewsArticleGrid;