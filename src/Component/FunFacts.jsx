import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import factsData from "./../data/FunFacts.json";

export default function FunFacts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="fun-fact-area section-bg position-relative over-hidden pt-150 pb-120"
    >
      <div className="container">
        <div className="row">
          {/* Left content */}
          <motion.div
            className="col-xl-5 col-lg-6 mb-50 mr-lg-2 mr-xl-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="fun-fact-content">
              <div className="title">
                <span className="theme-color text-uppercase d-block mb-1 mt--5">
                  Fun Facts
                </span>
                <h2 className="mb-30 text-white">
                  I Develop System that Works
                </h2>
              </div>
              <p>
                Sed ut perspiciatis unde omnis iste natus kobita tumi sopno
                charini hoye khbor nio na sit volup sundori toma amar tumi nili
                mar tatem accusantium dolore.
              </p>
            </div>
          </motion.div>

          {/* Right counters */}
          <motion.div
            className="col-xl-6 offset-xl-1 col-lg-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="row justify-content-center align-items-center">
              {factsData.map((fact, idx) => (
                <motion.div
                  key={idx}
                  className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-10 mb-30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="single-fact d-flex align-items-center border-radius10">
                    <div className="mr-25 d-flex align-items-start justify-content-center">
                      <span className="theme-color d-inline-block counter">
                        <CountUp
                          start={isInView ? 0 : null}
                          end={fact.value}
                          duration={4}
                        />
                      </span>
                      {fact.suffix && (
                        <span className="per d-inline-block theme-color">
                          {fact.suffix}
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-white mb-0"
                      dangerouslySetInnerHTML={{ __html: fact.label }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative shapes */}
      <motion.div
        className="fact-style1 position-absolute d-none d-md-inline-block"
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <img src="images/shape/fact-icon1.png" alt="shape 1" />
      </motion.div>
      <motion.div
        className="fact-style2 position-absolute d-none d-md-inline-block"
        initial={{ opacity: 0, rotate: 20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <img src="images/shape/fact-icon2.png" alt="shape 2" />
      </motion.div>
    </section>
  );
}
