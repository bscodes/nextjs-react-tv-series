import styles from '../../styles/MovieCard.module.scss';

export default function MovieCard(props) {
  return (
    <>
      <div className={styles.MovieCardWrapper}>
        <div className={styles.movieImageWrapper}>
          <img src={props.image} alt="" className={styles.movieImage} />
        </div>
        <div className={styles.movieInfo}>
          <div className={styles.movieTitleWrapper}>
            <h5 className={styles.movieTitle}>{props.movieTitle}</h5>
          </div>

          <hr className={styles.Line} />

          <div className={styles.movieRatingWrapper}>
            <span>
              Rating: {props.movieRating !== null ? props.movieRating : 'n/a'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
