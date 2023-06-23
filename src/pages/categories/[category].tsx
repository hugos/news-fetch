import { GetStaticPaths, GetStaticProps } from "next";
import { NewsArticle, NewsResponse } from "../../../models/NewsArticle";
import NewsArticleGrid from "../../../components/NewsArticleGrid";
import { useRouter } from "next/router";
import Head from "next/head";

interface CategoryNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const paths = categorySlugs.map((slug) => ({ params: { category: slug } }));
  return {
    paths,
    fallback: false,
  };
};

/*
  GetStaticProps allows us to fetch data at build time and pre-render a page with the fetched data.
*/

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({
  params,
}) => {
  const category = params?.category?.toString();
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles },
    revalidate: 5 * 60, 
    // Within 5 min, same page will be shown when refreshed. Will only fetch data every 5 min.
    // Only every 5 min we'll have a "slow" loading.
  };
};

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
  const router = useRouter(); // using this to get the url params
  const categoryName = router.query.category?.toString();
  const title = `Category: ${categoryName}`
  
  
  return (
    <>
    <Head>
      <title key="title">{title}</title>
    </Head>
      <main>
        <h1 className="text-capitalize">{title}</h1>
        <NewsArticleGrid articles={newsArticles}></NewsArticleGrid>
      </main>
    </>
  );
};

export default CategoryNewsPage;
