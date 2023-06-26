import Head from "next/head";
import { GetServerSideProps } from "next";
import { NewsArticle, NewsResponse } from "../../models/NewsArticle";
import NewsArticleGrid from "../../components/NewsArticleGrid";
interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

// next js provides this Function to get data from the server
// // the type is BNPP because that's what the function has to return
export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsResponse: NewsResponse = await response.json();
  return {
    props: {
      newsArticles: newsResponse.articles,
    },
  };
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News</title>
      </Head>
      <div className="d-flex flex-row justify-content-center align-items-center mb-5">
        <h1>Breaking News</h1>
      </div>
      <NewsArticleGrid articles={newsArticles} />
    </>
  );
}
