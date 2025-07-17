import React from "react";
import { TypeAnimation } from "react-type-animation"; // modern replacement
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import api from "../services/api";


export default function HeroSection() {
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
    <div id="home" className="slider-area slider-bg-color over-hidden">
      <div
        className="single-slider slider-height over-hidden position-relative xxl-device-width bg-cover no-repeat"
        style={{ backgroundImage: `url('images/slider/slider-bg.jpg')` }}
      >
        {/* Parallax shapes */}
        <div
          id="scene"
          className="parallax position-absolute w-100 h-100 z-index1"
        >
          <img
            data-depth="0.20"
            className="hero-shape hero-shape1 position-absolute d-none d-lg-inline-block"
            src="images/shape/shape1.png"
            alt=""
          />
          <img
            data-depth="0.15"
            className="hero-shape hero-shape2 position-absolute d-none d-lg-inline-block"
            src="images/shape/shape2.png"
            alt=""
          />
          <img
            data-depth="0.30"
            className="hero-shape hero-shape3 position-absolute d-none d-lg-inline-block"
            src="images/shape/shape3.png"
            alt=""
          />
          <img
            data-depth="0.10"
            className="hero-shape hero-shape4 position-absolute d-none d-lg-inline-block"
            src="images/shape/shape4.png"
            alt=""
          />
        </div>

        {/* Content */}
        <div className="container slider-height d-flex align-items-end">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-xl-5 col-lg-6 col-md-12 col-sm-11 col-12 d-flex align-items-center justify-content-center">
              <div className="slider-wrapper h-100">
                <motion.div
                  className="slider-content text-center mt--45 text-lg-left position-relative z-index11"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="mb-15 white-text">
                    <span className="sub-heading d-block text-uppercase theme-color mb-0">
                      Hello I’m
                    </span>
                    {aboutData.name}
                  </h1>
                  <h2 className="text-capitalize white-text mb-40">
                    A Passionate{" "}
                    <span className="d-text d-block d-sm-inline-block">
                      <TypeAnimation
                        sequence={[
                          "Software Engineer",
                          2000,
                          "Web Designer",
                          2000,
                          "Freelancer",
                          2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="theme-color d-inline-block pl-2"
                      />
                    </span>
                  </h2>
                  <a
                    href="#hero-btn"
                    className="btn position-relative over-hidden theme-bg text-uppercase transition5"
                  >
                    Say Hello
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Right image */}
            <div className="col-xl-7 col-lg-6 col-md-7 col-sm-10 col-12 d-flex justify-content-center align-items-end h-100">
              <div className="slider-img pl-120 position-relative z-index1">
                <img src={aboutData.BannerImage} alt="hero" />
              </div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="slider-social-link position-absolute right-0 d-none d-md-block z-index11">
          <ul className="social pr-60">
            <li className="mt-10 mb-10 rotate-hover">
              <a className="text-center d-inline-block rotate" href="#">
                <i className="fa-brands fa-facebook-f" />
              </a>
            </li>
            <li className="mt-10 mb-10 rotate-hover">
              <a className="text-center d-inline-block rotate" href="#">
                <i className="fa-brands fa-x-twitter" />
              </a>
            </li>
            <li className="mt-10 mb-10 rotate-hover">
              <a className="text-center d-inline-block rotate" href="#">
                <i className="fa-brands fa-linkedin-in" />
              </a>
            </li>
            <li className="mt-10 mb-10 rotate-hover">
              <a className="text-center d-inline-block rotate" href="#">
                <i className="fa-brands fa-youtube" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
