import { FormEvent, useState } from 'react'
import { NewsArticle } from '../../models/NewsArticle';
import { Form, Button } from 'react-bootstrap'

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
      alert(searchQuery)
    }
  }


  return (
    <main>
      <h1>Search News</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='search-input'>
            <Form.Label>Search Query</Form.Label>
            <Form.Control name="searchQuery" placeholder="E.g. politics, sports, ..."/>
        </Form.Group>
        <Button type="submit" className='mb-3' disabled={searchResultsIsLoading}>Search</Button>
      </Form>
    </main>
  );
};

export default SearchNewsPage;
