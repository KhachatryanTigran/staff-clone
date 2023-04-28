import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import { v4 as uuid } from "uuid";
const arr = [
  {
    src: "/img/1.png",
    id: 1,
  },

  {
    src: "/img/2.png",
    id: 2,
  },
  {
    src: "/img/3.png",
    id: 3,
  },

  {
    src: "/img/4.png",
    id: 3,
  },
];

export default function Slider() {
  const prod = arr.map((item) => (
    <div className="carousel-card" key={uuid()}>
      <img src={item.src} />
    </div>
  ));

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
    <div className="carousel-wrapper">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2500}
        customTransition="all .5"
      >
        {prod}
      </Carousel>
    </div>
  );
}
