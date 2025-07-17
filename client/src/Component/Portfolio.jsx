import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "./Marquee";
import PortfolioModal from "./PortfolioModal";
import api from "../services/api";

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const data = await api.getPortfolio();
      setPortfolioData(data || []);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setPortfolioData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section id="work" className="portfolio-area over-hidden pb-165">
      <Marquee />

      <motion.div
        className="portfolio-wrapper position-relative mt--5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          {/* Title */}
          <div className="row">
            <div className="col-12 text-center">
              <span className="theme-color text-uppercase d-block mb-6">
                Portfolio
              </span>
              <h2>My Recent Works</h2>
            </div>
          </div>

          {/* Portfolio list */}
          <div className="row portfolio mt-80">
            {portfolioData.map((item, idx) => (
              <div key={item.id} className="col-12">
                <motion.div
                  className={`row single-portfolio position-relative theme-border-top ${
                    idx === portfolioData.length - 1
                      ? "theme-border-bottom"
                      : ""
                  } align-items-center`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedItem(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="col-xl-2 col-lg-2 col-md-7">
                    <span className="meta-text-color text-uppercase">
                      {item.category}
                    </span>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-6 pl-lg-0">
                    <h3>{item.title}</h3>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-6 d-flex justify-content-end align-items-center">
                    <img
                      className="port-img position-absolute left-0 ml-xl-3 transition5"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="port-content text-center transition5 z-index11">
                      <i className="far fa-plus" />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <PortfolioModal
        isOpen={!!selectedItem}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
