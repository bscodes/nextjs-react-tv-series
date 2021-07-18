import SearchInput from '../components/search-input';
import styles from '../styles/Home.module.scss';
import { useEffect, useState } from 'react';
import MovieList from '../components/movie-list';
import LoadingIcons from 'react-loading-icons';
import { useAppContext } from '../context/state';
import RandomMovie from '../components/random-movie';

export default function Home({ randomMovieData, randomMovieImages }) {
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { searchQuery, loading, loadingHandler, searchQueryHandler } =
    useAppContext();

  const background =
    randomMovieImages?.name !== 'Not Found' &&
    randomMovieImages?.filter(
      (i) => i?.type === 'background' ?? i?.type === 'poster'
    )[0];

  useEffect(() => {
    if (loading) {
      loadingHandler(); // closes loadingBar on page load
    }
  }, []);

  const getData = async (searchQuery) => {
    await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieSuggestions(data);
        setMovieList(data);
      });
  };

  const search = () => {
    if (searchQuery?.length > 2) {
      getData(searchQuery);
    }
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    search();
    setMovieList(movieSuggestions);
  };

  return (
    <>
      {loading && (
        <div className="Loading">
          <LoadingIcons.Bars />
        </div>
      )}

      <div className={`container ${styles.SearchWrapper}`}>
        <SearchInput
          handleSubmit={handleSubmit}
          value={searchQuery}
          onChange={(e) => {
            searchQueryHandler(e?.target?.value);
          }}
        />
      </div>
      {movieList?.length > 0 && (
        <MovieList movies={movieList} setSpinner={loadingHandler} />
      )}
      {!movieList?.length && randomMovieData?.name !== 'Not Found' && (
        <RandomMovie
          onClick={loadingHandler}
          imageData={background}
          movieData={randomMovieData}
        />
      )}
    </>
  );
}

export const getServerSideProps = async () => {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const randomNumber = getRandomNumber(1, 750);

  try {
    const getRandomMovie = await fetch(
      `https://api.tvmaze.com/shows/${randomNumber}`
    );
    const getRandomImages = await fetch(
      `https://api.tvmaze.com/shows/${randomNumber}/images`
    );
    const randomMovieData = await getRandomMovie.json();
    const randomMovieImages = await getRandomImages.json();

    return {
      props: {
        randomMovieData: randomMovieData,
        randomMovieImages: randomMovieImages,
      },
    };
  } catch (error) {
    return { props: { randomMovieData: null, randomMovieImages: null } };
  }
};
