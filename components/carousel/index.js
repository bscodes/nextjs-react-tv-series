import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from '../../styles/CarouselView.module.scss';

export default function CarouselView(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={false}
        infinite={true}
        keyBoardControl={false}
        customTransition="all .5"
        autoPlay={false}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {props?.data
          ?.sort((a, b) =>
            a?.show?.rating?.average > b?.show?.rating?.average
              ? 1
              : b?.show?.rating?.average > a?.show?.rating?.average
              ? -1
              : 0
          )
          ?.map((item) => (
            <div key={item?.id}>
              <img
                className="d-block w-100"
                src={item?.show?.image?.medium || '/images/placeholder.jpeg'}
                alt={item?.show?.name}
              />
            </div>
          ))}
      </Carousel>
    </>
  );
}
