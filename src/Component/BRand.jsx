import React from "react";
import Slider from "react-slick";
import brandsData from "../data/brands.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Brand() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1025, settings: { slidesToShow: 4 } },
      { breakpoint: 991, settings: { slidesToShow: 4 } },
      { breakpoint: 767, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="brand-area brand-height over-hidden">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <ul className="brand-active mt-70 mb-90">
              <Slider {...settings}>
                {brandsData.map((brand) => (
                  <li
                    key={brand.id}
                    className="d-inline-block position-relative over-hidden"
                  >
                    <a
                      className="single-brand pt-20 d-block text-center transition3"
                      href="index.html"
                    >
                      <img className="img" src={brand.image} alt={brand.alt} />
                    </a>
                  </li>
                ))}
              </Slider>
            </ul>
          </div>
        </div>
        <div className="theme-border-bottom" />
      </div>
    </div>
  );
}
