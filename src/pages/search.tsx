import { FormEvent, useState } from 'react'
import { NewsArticle } from '../../models/NewsArticle';
import { Form, Button, Spinner } from 'react-bootstrap'
import NewsArticleGrid from '../../components/NewsArticleGrid';
import Head from 'next/head';

const SearchNewsPage = () => {
  // Search Results can either be an array of NewsArticle or Null. 
  const [ searchResults, setSearchResults ] = useState<NewsArticle[] | null>(null);
  const [ searchResultsIsLoading, setSearchResultsIsLoading ] = useState(false);
  const [ searchResultsIsLoadingIsError, setSearchResultsIsLoadingIsError ] = useState(false);

  // When submitting the form:

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop from refreshing
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if (searchQuery) {
      try {
        setSearchResults(null);
        setSearchResultsIsLoadingIsError(false);
        setSearchResultsIsLoading(true);
        const response = await fetch('/api/search-news?q=' + searchQuery)
        const articles: NewsArticle[] = await response.json();
        setSearchResults(articles);

      } catch(error) {
          console.error(error);
          setSearchResultsIsLoadingIsError(true)
      } // After both try and catch end 
      finally {
        setSearchResultsIsLoading(false)
      }
    }
  }

  return (
    <>
    <Head>
      <title key="title">Search News</title>
    </Head>
    <main>
      <h1>Search News</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='search-input'>
            <Form.Label>Search Query</Form.Label>
            <Form.Control name="searchQuery" placeholder="E.g. politics, sports, ..."/>
        </Form.Group>
        <Button type="submit" className='mb-3' disabled={searchResultsIsLoading}>Search</Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {searchResultsIsLoading && <Spinner animation='border'/>}
        {searchResultsIsLoadingIsError && <p>Something went wrong. Please try again.</p>}
        {searchResults?.length === 0 && <p>Nothing found. Try a different query.</p>} 
        {searchResults && <NewsArticleGrid articles={searchResults}/>}
      </div>
    </main>
    </>
  );
};

export default SearchNewsPage;
