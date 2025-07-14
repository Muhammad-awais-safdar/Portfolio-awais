import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    inputName: "",
    inputEmail: "",
    inputPhone: "",
    inputSubject: "",
    inputMessage: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        "service_h8ls53h", // replace with your actual service ID
        "template_upr4lkc", // replace with your actual template ID
        {
          name: formData.inputName,
          email: formData.inputEmail,
          phone: formData.inputPhone,
          subject: formData.inputSubject,
          message: formData.inputMessage,
        },
        "Sw2NMQzjlbiQVXKfc" // replace with your public key
      );

      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFormData({
        inputName: "",
        inputEmail: "",
        inputPhone: "",
        inputSubject: "",
        inputMessage: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setIsSending(false);
  };

  return (
    <>
      <div id="contact" className="contact-area over-hidden mb-160 mt-155">
        <div id="hero-btn" className="contact-wrapper position-relative">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-12">
                <motion.div
                  className="title text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="theme-color text-uppercase d-block mb-6">
                    Contact Me
                  </span>
                  <h2>Let’s Start A New Project</h2>
                </motion.div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-5">
                <motion.div
                  className="contact-wrapper mt-70"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <ul className="contact-info-content">
                    <li className="contact-location mb-20 d-lg-flex align-items-center">
                      <div className="contact-icon theme-bg mr-30 text-center">
                        <span className="text-white">
                          <i className="fas fa-map-marker-alt" />
                        </span>
                      </div>
                      <div className="contact-text">
                        <h4 className="mb-2">Location</h4>
                        <p className="text-color mb-0">
                          20 Bordeshi, London, USA
                        </p>
                      </div>
                    </li>
                    <li className="contact-email mb-20 d-lg-flex align-items-center">
                      <div className="contact-icon theme-bg mr-30 text-center">
                        <span className="text-white">
                          <i className="fas fa-phone-alt" />
                        </span>
                      </div>
                      <div className="contact-text">
                        <h4 className="mb-2">Phone</h4>
                        <p className="mb-0">
                          <a className="text-color" href="#">
                            +123 456 7890
                          </a>
                        </p>
                      </div>
                    </li>
                    <li className="contact-phone mb-20 d-lg-flex align-items-center">
                      <div className="contact-icon theme-bg mr-30 text-center">
                        <span className="text-white">
                          <i className="fas fa-envelope" />
                        </span>
                      </div>
                      <div className="contact-text">
                        <h4 className="mb-2">Email</h4>
                        <p className="mb-0">
                          <a className="text-color" href="#">
                            hello@thames.com
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
              <div className="col-xl-6 col-lg-7">
                <motion.div
                  className="contact-wrapper"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="contact-form mt-45">
                    <form onSubmit={handleSubmit}>
                      <div className="contact-info pt-20">
                        <div className="row">
                          <div className="col-md-6 mb-12">
                            <input
                              className="w-100 theme-border pl-20 pt-15 pb-15 pr-10 border-radius5 text-white"
                              type="text"
                              name="inputName"
                              placeholder="Your Name"
                              value={formData.inputName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-12">
                            <input
                              className="w-100 theme-border pl-20 pt-15 pb-15 pr-10 border-radius5 text-white"
                              type="email"
                              name="inputEmail"
                              placeholder="Your Email"
                              value={formData.inputEmail}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-12">
                            <input
                              className="w-100 theme-border pl-20 pt-15 pb-15 pr-10 border-radius5 text-white"
                              type="text"
                              name="inputPhone"
                              placeholder="Your Phone"
                              value={formData.inputPhone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-12">
                            <input
                              className="w-100 theme-border pl-20 pt-15 pb-15 pr-10 border-radius5 text-white"
                              type="text"
                              name="inputSubject"
                              placeholder="Your Subject"
                              value={formData.inputSubject}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 mb-12">
                            <textarea
                              className="w-100 theme-border pl-20 pt-15 pr-10 border-radius5 text-white"
                              name="inputMessage"
                              placeholder="Start writing message here"
                              value={formData.inputMessage}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <button
                          className="btn theme-bg text-uppercase d-inline-flex align-items-center"
                          type="submit"
                          disabled={isSending}
                        >
                          {isSending ? (
                            <>
                              <span className="spinner-border spinner-border-sm mr-2"></span>{" "}
                              Sending...
                            </>
                          ) : (
                            "Submit Now"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
