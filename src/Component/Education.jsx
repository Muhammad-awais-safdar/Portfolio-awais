import React from "react";

export default function Education() {
  return (
    <>
      <div className="education-area over-hidden">
        <div className="container">
          <div className="row position-relative">
            <div className="col-xl-6 col-lg-6  col-md-12 col-sm-12 col-12">
              <div className="position-relative">
                <div className="title">
                  <span className="theme-color text-uppercase d-block mb-1">
                    Education
                  </span>
                  <h2 className="mb-25">My Education</h2>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus kobita tumi sopno
                    charini hoye khbor nio na sit voluptatem accusantium dolore.
                  </p>
                </div>
                {/* /title */}
              </div>
              <div className="education-wrapper mr-20 pt-25 mb-50">
                <ul className="education-content">
                  <li className="mb-32 d-flex align-items-start rotate-hover">
                    <div className="experience-ser-icon d-inline-block text-center mt-10 mr-30 transition3">
                      <span className="theme-color d-inline-block">
                        <span className="d-block rotate flat-family flaticon-graduation-cap" />
                      </span>
                    </div>
                    {/* /education-ser-icon */}
                    <div className="experience-service-text d-inline-block">
                      <h3 className="mb-2">Masters in Computer Science</h3>
                      <h4>
                        New York University
                        <span className="meta-text-color openS-font-family">
                          
                          ( 2012 - 2016 )
                        </span>
                      </h4>
                      <p className="mb-0 mt-15">
                        Ludantium totam rem aperia meaque ipsa quae ab illo
                        inven tore veritatis et quasi architecto beatae vitae.
                      </p>
                    </div>
                  </li>
                  <li className="mb-32 d-flex align-items-start rotate-hover">
                    <div className="experience-ser-icon d-inline-block text-center mt-10 mr-30 transition3">
                      <span className="theme-color d-inline-block">
                        <span className="d-block rotate flat-family flaticon-graduation-cap" />
                      </span>
                    </div>
                    {/* /education-ser-icon */}
                    <div className="experience-service-text d-inline-block">
                      <h3 className="mb-2">Bachelor in Computer Engineering</h3>
                      <h4>
                        Dhaka University
                        <span className="meta-text-color openS-font-family">
                          
                          ( 2008 - 2011 )
                        </span>
                      </h4>
                      <p className="mb-0 mt-15">
                        Ludantium totam rem aperia meaque ipsa quae ab illo
                        inven tore veritatis et quasi architecto beatae vitae.
                      </p>
                    </div>
                  </li>
                  <li className="mb-32 d-flex align-items-start rotate-hover">
                    <div className="experience-ser-icon d-inline-block text-center mt-10 mr-30 transition3">
                      <span className="theme-color d-inline-block">
                        <span className="d-block rotate flat-family flaticon-graduation-cap" />
                      </span>
                    </div>
                    {/* /education-ser-icon */}
                    <div className="experience-service-text d-inline-block">
                      <h3 className="mb-2">Diploma in Graphic Design</h3>
                      <h4>
                        Bangla College
                        <span className="meta-text-color openS-font-family">
                          
                          ( 2006 - 2008 )
                        </span>
                      </h4>
                      <p className="mb-0 mt-15">
                        Ludantium totam rem aperia meaque ipsa quae ab illo
                        inven tore veritatis et quasi architecto beatae vitae.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* /education-wrapper */}
            </div>
            {/* /col */}
            <div className="col-xl-5 offset-xl-1 col-lg-6 col-md-12 col-sm-12 col-12 d-lg-blok d-flex align-items-center justify-content-center">
              <div
                className="education-img position-relative text-center"
                data-aos="fade-left"
                data-aos-duration={2000}
              >
                <img
                  className="border-radius12"
                  src="images/education/education-img.jpg"
                  alt="education image"
                />
              </div>
              {/* /education-img */}
            </div>
            {/* /col */}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
    </>
  );
}
