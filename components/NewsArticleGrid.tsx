import { Col, Row } from "react-bootstrap";
import { NewsArticle } from "../models/NewsArticle";
import NewsArticleEntry from "./NewsArticleEntry";

interface NewsArticleGridProps {
    article: NewsArticle[];
}


const NewsArticleGrid = ({ article }: NewsArticleGridProps) => {
    return ( 
        <Row xs={1} sm={2} xl={4} className="g-4">
            {article.map(article => (
                <Col key={article.url}>
                    <NewsArticleEntry article={article}/>
                </Col>

            ))}
        </Row>
     );
}
 
export default NewsArticleGrid;