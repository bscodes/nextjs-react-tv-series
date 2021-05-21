import SearchInput from '../components/search-input';
import styles from '../styles/Home.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Suggestions from '../components/suggestions';
import { useEffect, useState } from 'react';
import MovieList from '../components/movie-list';
import MoonLoader from 'react-spinners/ClipLoader';

export default function Home() {
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    search();
    return () => {
      setMovieSuggestions([]); // this cleanup function works after clear the input field
    };
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === '') {
      getData('pokemon');
      setMovieList(movieSuggestions);
      setIsSuggestionsOpen(false);
    }
  }, [movieSuggestions, searchQuery]);

  const getData = async (searchQuery) => {
    await fetch(`http://api.tvmaze.com/search/shows?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieSuggestions(data);
      });
  };

  const search = () => {
    if (searchQuery.length > 2) {
      getData(searchQuery);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    search();
    setMovieList(movieSuggestions);
    setIsSuggestionsOpen(false);
  };

  return (
    <>
      {loading && (
        <div className={styles.Loading}>
          <MoonLoader color={'#000000'} loading={loading} size={250} />
        </div>
      )}
      <div className="container">
        <SearchInput
          handleSubmit={handleSubmit}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSuggestionsOpen(true);
          }}
        />

        {movieSuggestions.length > 0 && isSuggestionsOpen && (
          <Suggestions suggestions={movieSuggestions} />
        )}

        <MovieList
          movies={movieList}
          setSpinner={() => setLoading(true)}
          isSuggestionsOpened={
            movieSuggestions.length > 0 && isSuggestionsOpen ? true : false
          }
        />
      </div>
    </>
  );
}
