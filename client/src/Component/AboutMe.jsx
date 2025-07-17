import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import api from "../services/api";

export default function AboutMe() {
  const [aboutData, setAboutData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const data = await api.getAbout();
      setAboutData(data || {});
    } catch (error) {
      console.error('Error fetching about data:', error);
      setAboutData({});
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section id="about" className="about-area over-hidden">
      <div className="about-content-wrapper about-margin mt-170 mb-110 position-relative">
        <div className="container">
          <div className="row justify-content-center">
            {/* Image column with tilt + animation */}
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-10 col-10">
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <motion.div
                  className="about-img-wrapper position-relative mb-90"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="about-img-over pl-50 transition5 d-inline-block position-relative">
                    <img
                      className="border-radius13 position-relative z-index11"
                      src={aboutData.image}
                      alt={`${aboutData.name} portrait`}
                    />
                    <div className="about-shape1 position-absolute" />
                    <div className="about-shape2 position-absolute z-index11" />
                    <div className="about-download-wrapper position-absolute z-index11">
                      <img
                        className="download-bg rotate-animation d-inline-block"
                        src="images/about/download-bg.png"
                        alt="Rotating background"
                      />
                      <a href="#" className="cv-download-link transition5">
                        <img
                          className="d-icon d-inline-block position-absolute"
                          src="images/icon/download-icon.png"
                          alt="Download icon"
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            </div>

            {/* Content column with animation */}
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <motion.div
                className="about-content position-relative mb-50"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="title">
                  <span className="theme-color text-uppercase d-block mb-1 mt--5">
                    About Me
                  </span>
                  <h2 className="mb-30">{aboutData.title}</h2>
                </div>
                <p className="mb-25">{aboutData.description1}</p>
                <p>{aboutData.description2}</p>

                {/* Info */}
                <div className="about-info-wrapper pt-25 pb-20 mt-25">
                  <div className="row">
                    <div className="col-xl-5 col-lg-12 col-md-6 col-sm-12 col-12">
                      <ul className="about-info">
                        <li className="d-inline-block pr-22">
                          <p className="jostMedium-font-family mb-6">Name</p>
                          <p className="jostMedium-font-family mb-6">Age</p>
                          <p className="jostMedium-font-family mb-6">
                            Occupation
                          </p>
                        </li>
                        <li className="d-inline-block">
                          <p className="mb-6">{aboutData.name}</p>
                          <p className="mb-6">{aboutData.age}</p>
                          <p className="mb-6">{aboutData.occupation}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-7 col-lg-12 col-md-6 col-sm-12 col-12">
                      <ul className="about-info">
                        <li className="d-inline-block pr-50">
                          <p className="jostMedium-font-family mb-6">Phone</p>
                          <p className="jostMedium-font-family mb-6">Email</p>
                          <p className="jostMedium-font-family mb-6">
                            Nationality
                          </p>
                        </li>
                        <li className="d-inline-block">
                          <p className="mb-6">{aboutData.phone}</p>
                          <p className="mb-6">{aboutData.email}</p>
                          <p className="mb-6">{aboutData.nationality}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Signature footer */}
                <div className="about-footer-content d-flex align-items-center mt-lg-2 mt-sm-4 mt-3">
                  <div className="signature pt-12 pr-45">
                    <img src={aboutData.signature} alt="Signature" />
                  </div>
                  <div className="about-footer-content-right mt-20 text-left">
                    <h6 className="d-xl-inline-block text-uppercase pr5 mb-0">
                      {aboutData.signatureName}
                    </h6>
                    <span className="openS-font-family meta-text-color">
                      {aboutData.signatureTitle}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative text & icon with animation */}
        <motion.div
          className="about-text-style position-absolute d-none d-md-inline-block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="d-inline-block section-text-color">
            {aboutData.name?.split(" ")[1] || "Smith"}
          </span>
        </motion.div>
        <motion.div
          className="about-icon position-absolute d-none d-md-inline-block z-index1 zoom-animation"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src="images/shape/content-shape2.png" alt="Decorative shape" />
        </motion.div>
      </div>
    </section>
  );
}
