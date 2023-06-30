import Image from "next/image";
import { NewsArticle } from "../models/NewsArticle";
import { Button, Card } from "react-bootstrap";
import styles from "@/styles/NewsArticleEntry.module.css";
import { ArrowUpRightCircle } from "react-bootstrap-icons";
import { bkgColor } from "@/styles/colors";

interface NewsArticleEntryProps {
  article: NewsArticle;
}

// Descructuring article object
const NewsArticleEntry = ({
  article: { title, description, url, urlToImage, source },
}: NewsArticleEntryProps) => {
  const { name } = source;

  //TODO: If there's no description, eliminate article.

  // check if image url is valid
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;

  return (
    // TODO: Make only News Outlet clickable. Also add a little link icon for UX.
    <>
      <Card className="h-100">
        <Image
          className={`card-img-top ${styles.image}`}
          src={validImageUrl || ""}
          width={500}
          height={200}
          alt="Article Image"
        />
        <Card.Body>
          <Card.Title className={styles.cardTitle}>{title}</Card.Title>
          <Card.Subtitle className="mt-3 mb-3 d-flex justify-content-between">
            {name}
            <Button variant="custom" className="arrow-button">
              {" "}
              <a href={url} target="_blank">
                <ArrowUpRightCircle className="arrow-icon" />
              </a>
            </Button>
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default NewsArticleEntry;
