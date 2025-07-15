import React from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import experienceData from "../data/experience.json";

export default function Experience() {
  return (
    <div className="experience-area over-hidden pb-165 position-relative">
      {/* Parallax background on left */}
      <Parallax
        bgImage="images/work/work-img.jpg"
        strength={200}
        className="position-absolute top-0 bottom-0 start-0 w-50 h-100"
      >
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            width: "100%",
            height: "100%",
          }}
        ></div>
      </Parallax>

      <div className="container position-relative">
        <div className="row">
          <motion.div
            className="col-xl-6 col-lg-6 offset-lg-6 col-md-12 col-sm-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="experience-margin mt-160 pb-80 pl-100 mb-50">
              <motion.div
                className="position-relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="title">
                  <span className="theme-color text-uppercase d-block mb-6 mt--5">
                    Work Experience
                  </span>
                  <h2 className="mb-25">My Experience</h2>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus kobita tumi sopno
                    charini hoye khbor nio na sit voluptatem.
                  </p>
                </div>
              </motion.div>

              <div className="experience-wrapper pt-25">
                <ul className="experience-content">
                  {experienceData.map((item, index) => (
                    <motion.li
                      key={index}
                      className="mb-32 d-flex align-items-start rotate-hover"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, delay: index * 0.2 }}
                    >
                      <div className="experience-ser-icon d-inline-block text-center mt-10 mr-30 transition3">
                        <span className="theme-color d-inline-block">
                          <span className="d-block rotate flat-family flaticon-briefcase" />
                        </span>
                      </div>
                      <div className="experience-service-text d-inline-block">
                        <h3 className="mb-2">{item.title}</h3>
                        <h4>
                          {item.company}{" "}
                          <span className="meta-text-color openS-font-family">
                            ( {item.years} )
                          </span>
                        </h4>
                        <p className="mb-0 mt-15">{item.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}