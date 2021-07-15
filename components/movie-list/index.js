import styles from '../../styles/MovieList.module.scss';
import Link from 'next/link';
import MovieCard from '../movie';

export default function MovieList(props) {
  return (
    <>
      <div onClick={props.setSpinner} className={styles.MovieListWrapper}>
        <div className="container">
          <div className="row">
            {props.movies.map((item) => (
              <div className="col-lg-3 col-md-6" key={item?.show?.id}>
                <Link
                  href={{
                    pathname: '/movie',
                    query: { filmId: `${item?.show?.id}` },
                  }}
                >
                  <a className={styles.Link}>
                    <MovieCard
                      key={item?.show?.id}
                      movieTitle={item?.show?.name}
                      image={
                        item?.show.image?.medium ||
                        item?.show.image?.original ||
                        '/images/placeholder.jpeg'
                      }
                      movieRating={item?.show?.rating?.average}
                    />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
