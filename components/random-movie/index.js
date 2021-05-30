import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styles from '../../styles/RandomMovie.module.scss';

export default function RandomMovie(props) {
  return (
    <>
      <section className={styles.HeroSection}>
        <div className={styles.HeroContainer}>
          <div className={styles.InfoContainer}>
            <h3>{props.movieData?.name}</h3>
            <div className={styles.ButtonContainer}>
              <Link
                href={{
                  pathname: '/movie',
                  query: { filmId: `${props?.movieData?.id}` },
                }}
              >
                <a className={styles.Link} onClick={props.onClick}>
                  <Button variant=""> Info</Button>
                </a>
              </Link>
            </div>
          </div>

          <div className={styles.HeroImageContainer}>
            <div
              className={styles.HeroImage}
              style={{
                backgroundImage: `url(${props.imageData?.resolutions?.original?.url})`,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
