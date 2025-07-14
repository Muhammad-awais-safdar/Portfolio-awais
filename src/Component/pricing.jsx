import React from "react";
import pricingData from "../data/pricingData.json";

export default function Pricing() {
  return (
    <div className="pricing-area over-hidden pt-160 pb-140">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="title text-center">
              <span className="theme-color text-uppercase d-block mb-6">
                Let’s Start Working
              </span>
              <h2>Pricing Plans</h2>
            </div>
          </div>
        </div>

        <div className="row price-wrapper justify-content-center mt-80">
          {pricingData.map((plan, index) => (
            <div
              key={index}
              className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration={plan.aosDuration}
            >
              <div className="single-price primary-bg shadow-hover transition3 border-radius10 pl-45 pr-45 pt-45 pb-50 mb-30">
                <h3 className="theme-border-bottom pb-25">{plan.title}</h3>
                <p className="mt-20 mb-10 f-500 primary-bg">
                  <span className="theme-color rate pr-12">{plan.price}</span> /{" "}
                  {plan.per}
                </p>
                <ul className="price-list">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="d-flex align-items-center">
                      <span
                        className={`${
                          feature.included ? "theme-color" : "disable"
                        } d-inline-block text-center`}
                      >
                        <i
                          className={`fa-solid ${
                            feature.included ? "fa-check" : "fa-xmark"
                          }`}
                        />
                      </span>
                      <p className="mb-0 ml-20">{feature.label}</p>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="btn position-relative over-hidden theme-bg text-uppercase mt-25"
                >
                  Start now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}