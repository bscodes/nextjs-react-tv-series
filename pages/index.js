import SearchInput from '../components/search-input';
import styles from '../styles/Home.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Suggestions from '../components/suggestions';
import { useEffect, useState } from 'react';
import MovieList from '../components/movie-list';

export default function Home() {
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    search();
    return () => {
      setMovieSuggestions([]); // this cleanup function works after clear the input field
    };
  }, [searchQuery]);

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
        isSuggestionsOpened={
          movieSuggestions.length > 0 && isSuggestionsOpen ? true : false
        }
      />
    </div>
  );
}
