import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import api from "../services/api";

export default function IntroFeatureArea() {
  const [introFeatures, setIntroFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntroFeatures();
  }, []);

  const fetchIntroFeatures = async () => {
    try {
      const data = await api.getIntroFeatures();
      setIntroFeatures(data || []);
    } catch (error) {
      console.error('Error fetching intro features:', error);
      setIntroFeatures([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="intro-feature-area section-bg over-hidden position-relative">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="intro-feature-area section-bg over-hidden position-relative">
      <div className="container">
        <div className="row single-intro-feature-wrapper justify-content-center pt-170 pb-140">
          {introFeatures.map((item, idx) => (
            <div
              key={item._id || idx}
              className="col-xl-3 col-lg-3 col-md-6 col-sm-9 col-11"
            >
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={false}>
                <motion.div
                  className={`single-intro-feature-content primary-bg border-radius10 transition5 mb-30 ${
                    item.extraClass || ""
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="intro-ft-icon d-inline-block mb-30 transition5">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <div className="intro-feature-text">
                    <h4 className="mb-22">{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </motion.div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative text */}
      <motion.div
        className="intro-feature-text-style position-absolute d-none d-md-inline-block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <span className="d-inline-block">James</span>
      </motion.div>

      {/* Decorative shape */}
      <motion.div
        className="intro-feature-icon position-absolute d-none d-md-inline-block zoom-animation"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src="images/shape/shape2.png" alt="intro shape" />
      </motion.div>
    </div>
  );
}
