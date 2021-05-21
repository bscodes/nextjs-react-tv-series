import 'bootstrap/dist/css/bootstrap.min.css';

import styles from '../../styles/MoviePage.module.scss';
export default function MoviePage({ data }) {
  return (
    <>
      <div className={styles.MoviePage}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className={styles.TitleWrapper}>
                <h3>{data?.name}</h3>
              </div>
            </div>
          </div>

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
                    ${data?.summary} 
                    </i>`,
                    }}
                  />
                  <div className={styles.InfoWrapper}>
                    <h5>Show Info</h5>
                    {data?.network !== null && (
                      <p>
                        <span className={styles.InfoWrapperTitles}>
                          Network:
                        </span>{' '}
                        <span> {data?.network.name} </span>{' '}
                      </p>
                    )}

                    <p>
                      <span className={styles.InfoWrapperTitles}> Status:</span>{' '}
                      <span> {data?.status} </span>{' '}
                    </p>

                    <p>
                      <span className={styles.InfoWrapperTitles}>
                        {' '}
                        Show Type:
                      </span>{' '}
                      <span> {data?.type} </span>{' '}
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
  const res = await fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`);
  const data = await res.json();

  try {
    const res = await fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`);
    const data = await res.json();

    return { props: { data: data } };
  } catch (error) {
    return { props: { data: null } };
  }
};
