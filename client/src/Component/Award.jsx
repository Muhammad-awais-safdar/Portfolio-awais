import React from "react";
import awardsData from "../data/awardsData.json"; // adjust path if needed

export default function Award() {
  return (
    <div className="award-area over-hidden position-relative z-index11 pt-160 pb-170">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="title text-center">
              <span className="theme-color text-uppercase d-block mb-6">
                Success Stories
              </span>
              <h2>Awards & Achievements</h2>
            </div>
          </div>
        </div>

        <div className="award-wrapper mt-70">
          {awardsData.map((award, index) => (
            <div
              key={award.id}
              className={`row align-items-start theme-border-top ${
                index === awardsData.length - 1 ? "theme-border-bottom" : ""
              } award-margin pt-40 pb-35`}
            >
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-12">
                <div className="award-logo mt-10 mb-20">
                  <a href="#" className="d-block">
                    <img src={award.logo} alt={award.title} />
                  </a>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-11 col-12">
                <div className="award-content">
                  <h3 className="mb-10">{award.title}</h3>
                  <p className="meta-text-color">{award.year}</p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-11 col-12">
                <div className="award-content">
                  <h3 className="mb-10">{award.organization}</h3>
                  <p className="meta-text-color">{award.location}</p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-12">
                <div className="award-content">
                  <p>{award.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
