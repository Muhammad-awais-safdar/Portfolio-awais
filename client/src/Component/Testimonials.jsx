import React from "react";
import Slider from "react-slick";
import testimonialsData from "../data/testimonials.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "30px",
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonial-area position-relative over-hidden">
      <div className="container">
        <div className="testimonial-bg section-bg pt-170 pb-170 position-relative">
          <div className="row align-items-start justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
              <div className="position-relative">
                <div className="title">
                  <span className="theme-color text-uppercase d-block mb-6">
                    Testimonials
                  </span>
                  <h2 className="mb-20">What People Say</h2>
                </div>
              </div>
              <div className="testimonial-wrapper position-relative mt-40 pb-50">
                <div className="quit d-inline-block position-absolute left-0">
                  <img
                    className="theme-color"
                    src="images/testimonial/testimonial-icon.png"
                    alt="quote"
                  />
                </div>
                <div className="testimonial-active pl-80 pr-90">
                  <Slider {...settings}>
                    {testimonialsData.map((testimonial) => (
                      <div className="testimonial-content" key={testimonial.id}>
                        <blockquote className="testimonial-text position-relative mb-0 font-italic openS-font-family text-color">
                          {testimonial.text}
                        </blockquote>
                        <div className="testi-info d-flex align-items-center mt-40">
                          <div className="testi-avatar mr-25">
                            <img
                              className="rounded-circle"
                              src={testimonial.authorImage}
                              alt={testimonial.alt}
                            />
                          </div>
                          <div className="avatar-info">
                            <h5 className="mb-1 text-capitalize">
                              {testimonial.authorName}
                            </h5>
                            <p className="meta-text-color mb-0">
                              {testimonial.authorTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-11 col-12">
              <div
                className="testimonial-img position-relative z-index1"
                data-aos="fade-left"
                data-aos-duration={1500}
              >
                <img
                  className="border-radius12"
                  src="images/testimonial/testimonials-img.jpg"
                  alt="testimonial main"
                />
              </div>
            </div>
          </div>
          <div className="intro-feature-text-style testimonial-text-style position-absolute d-none d-md-inline-block">
            <span className="d-inline-block">Testim</span>
          </div>
        </div>
      </div>
    </div>
  );
}
