import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortfolioModal({ isOpen, onClose, item }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="custom-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="custom-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="custom-modal-close" onClick={onClose}>
              <i className="fa fa-times" />
            </button>

            <img
              className="w-100 mb-3"
              src={item.largeImage}
              alt={item.title}
            />
            <h2 className="text-center text-dark">{item.title}</h2>
            <p className="text-center text-dark">{item.description}</p>

            <div className="meta-wrapper form-bg mt-30 pt-20 pb-20 pr-20 pl-20">
              <ul className="item-meta">
                <li>
                  Client:{" "}
                  <span className="pl-2 openS-font-family">{item.client}</span>
                </li>
                <li>
                  Duration:{" "}
                  <span className="pl-2 openS-font-family">
                    {item.duration}
                  </span>
                </li>
                <li>
                  Task:{" "}
                  <span className="pl-2 openS-font-family">{item.task}</span>
                </li>
                <li>
                  Budget:{" "}
                  <span className="pl-2 openS-font-family">{item.budget}</span>
                </li>
              </ul>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn position-relative over-hidden theme-bg text-uppercase mt-20 pt-2 pb-2"
              >
                View Live
              </a>
            </div>

            <div className="modal-tags d-sm-flex align-items-center pt-25">
              <h6 className="mb-0 pr-15">Tags:</h6>
              <ul className="tag-list">
                {item.tags.map((tag, i) => (
                  <li key={i} className="d-inline-block pr-10">
                    <a className="d-block" href="#">
                      {tag}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
