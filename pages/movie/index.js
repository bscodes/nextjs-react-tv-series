import { useEffect, useState } from 'react';
import LoadingIcons from 'react-loading-icons';
import Navbar from '../../components/navbar';
import styles from '../../styles/MoviePage.module.scss';
import * as Helpers from '../../utils/Utils';
import { useAppContext } from '../../context/state';

function Header(props) {
  const { loadingHandler } = useAppContext();
  return (
    <>
      <Navbar onClick={loadingHandler} title={props.movieData?.name} />
      <section className={styles.HeroSection}>
        <div className={styles.HeroContainer}>
          <div className={styles.InfoContainer}>
            <h3>{props.movieData?.name}</h3>
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

export default function MoviePage({ data, images }) {
  const { loading, loadingHandler } = useAppContext();

  const banner = images.filter((i) => i.type === 'background')[0];
  const poster = images.filter((i) => i.type === 'poster')[0];

  useEffect(() => {
    if (loading) {
      loadingHandler(); // closes loadingBar on page load
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="Loading">
          <LoadingIcons.Bars />
        </div>
      )}
      <div className={styles.MoviePage}>
        <Header imageData={banner ? banner : poster} movieData={data} />

        <div className="container">
          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-4 col-sm-4 mb-3 mb-md-0">
                  <div className={styles.ImageWrapper}>
                    <img
                      className={styles.Image}
                      src={data?.image?.medium || '/images/placeholder.jpeg'}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-8 col-sm-8 d-flex flex-column justify-content-center">
                  <div
                    className={styles.Summary}
                    dangerouslySetInnerHTML={{
                      __html: `
                    <i>
                    ${data?.summary || ''} 
                    </i>`,
                    }}
                  />
                  <div className={styles.InfoWrapper}>
                    {data?.network && (
                      <p>
                        <span className={styles.InfoWrapperTitles}>
                          Network:
                        </span>{' '}
                        <span> {data?.network.name} </span>{' '}
                      </p>
                    )}

                    {data?.webChannel && (
                      <p>
                        <span className={styles.InfoWrapperTitles}>
                          Web Channel:
                        </span>{' '}
                        <span> {data?.webChannel.name} </span>{' '}
                      </p>
                    )}

                    {data?.rating?.average && (
                      <p>
                        <span className={styles.InfoWrapperTitles}>
                          {' '}
                          Rating:
                        </span>{' '}
                        <span> {data?.rating.average} </span>{' '}
                      </p>
                    )}

                    <p>
                      <span className={styles.InfoWrapperTitles}> Genres:</span>{' '}
                      {data?.genres?.map((genre) => (
                        <span key={Helpers.generateKey(genre)}>{genre} </span>
                      ))}
                    </p>

                    <p>
                      <span className={styles.InfoWrapperTitles}>
                        {' '}
                        Language:
                      </span>{' '}
                      <span> {data?.language} </span>{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const id = query.filmId;

  try {
    const getMovieData = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const getMovieImages = await fetch(
      `https://api.tvmaze.com/shows/${id}/images`
    );
    const movieData = await getMovieData.json();
    const movieImages = await getMovieImages.json();

    return { props: { data: movieData, images: movieImages } };
  } catch (error) {
    return { props: { data: null, images: null } };
  }
};
