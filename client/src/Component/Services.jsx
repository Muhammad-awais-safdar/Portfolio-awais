import React from "react";
import servicesData from "../data/services.json";

export default function Services() {
  return (
    <>
      <div
        id="service"
        className="service-area section-bg over-hidden pt-160 pb-145"
      >
        <div className="service-wrapper position-relative">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="title text-center">
                  <span className="theme-color text-uppercase d-block mb-6">
                    Service
                  </span>
                  <h2 className="text-white">What I offer</h2>
                </div>
              </div>
            </div>
            <div className="row service-wrappers mt-80">
              {servicesData.map((service, index) => (
                <div
                  key={index}
                  className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-duration={service.aosDuration}
                  data-aos-delay={service.aosDelay}
                >
                  <div className="single-service shadow-hover transition3 primary-bg border-radius10 pl-50 pr-50 pt-65 pb-55 mb-25">
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-4 col-4 text-lg-center">
                        <div className="service-ser-icon d-inline-block text-center position-relative mb-15">
                          <img
                            className="position-relative z-index1"
                            src={service.icon}
                            alt="icon"
                          />
                          <div className="service-small-circle service-circle rounded-circle transition5 secondary-bg d-inline-block position-absolute"></div>
                          <div className="service-large-circle service-circle rounded-circle transition5 secondary-bg d-inline-block position-absolute"></div>
                        </div>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="service-text d-inline-block ml-xl-2">
                          <h3 className="mb-15">{service.title}</h3>
                          <p className="mb-0">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-icon position-absolute d-none d-md-inline-block z-index1 zoom-animation">
            <img src="images/shape/content-shape2.png" alt="shape 2" />
          </div>
        </div>
      </div>
    </>
  );
}
