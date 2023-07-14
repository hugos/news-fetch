import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { NewsArticle } from "../models/NewsArticle";
import NewsArticleEntry from "./NewsArticleEntry";
import styles from "@/styles/NewsArticleGrid.module.css";

interface NewsArticleGridProps {
  articles: NewsArticle[];
}

const NewsArticleGrid = ({ articles }: NewsArticleGridProps) => {
  const [filteredBySource, setFilteredBySource] = useState<NewsArticle[]>([]);
  const sourceIds = Array.from(
    new Set(articles.map((article) => article.source.id))
  );
  const sourceIdToNameMap = new Map();
  articles.forEach((article) => {
    const { id, name } = article.source;
    sourceIdToNameMap.set(id, name);
  });
  const names = Array.from(sourceIdToNameMap.values());

  // Filtering articles array to check if they have valid images
  const validArticles = articles.filter((article) => {
    const validImageUrl =
      article.urlToImage?.startsWith("http://") ||
      article.urlToImage?.startsWith("https://");
    return validImageUrl;
  });

  // Filter articles by source
  const filterArticlesBySource = (id: string) => {
    // Check if the clicked source is already active
    // if so and clicked again, it clears the filter.

    if (filteredBySource.length > 0 && filteredBySource[0]?.source.id === id) {
      setFilteredBySource([]);
      return; // Exit the function to clear the filter
    }

    const filtered = validArticles.filter(
      (article) => article.source.id === id
    );
    setFilteredBySource(filtered);
  };

  const renderArticles =
    filteredBySource.length > 0 ? filteredBySource : validArticles;

  return (
    <>
      <div className="source-list">
        {sourceIds
          .filter((id, index) => id)
          .map((id, index) => (
            <Button
              key={id}
              variant="custom"
              className={`${styles.sourceButton} ${
                filteredBySource.length > 0 &&
                filteredBySource[0].source.id === id
                  ? `${styles.active}`
                  : ""
              }`}
              onClick={() => filterArticlesBySource(id)}
            >
              {sourceIdToNameMap.get(id)}
            </Button>
          ))}
      </div>
      <Row xs={1} sm={2} xl={4} className="g-4 mt-2">
        {renderArticles.map((article) => (
          <Col key={article.url} className={`${styles.newsCard}`}>
            <NewsArticleEntry article={article} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default NewsArticleGrid;
