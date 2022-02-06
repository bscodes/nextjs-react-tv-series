import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { BsInfoCircleFill } from 'react-icons/bs';
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
                  <Button variant="">
                    {' '}
                    <BsInfoCircleFill /> <span className="ml-1">Info</span>
                  </Button>
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
