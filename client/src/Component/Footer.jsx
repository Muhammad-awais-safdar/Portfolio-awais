import React from "react";

export default function Footer() {
  // JSON for social links
  const socialLinks = [
    { id: 1, icon: "fa-facebook-f", url: "#", class: "facebook-bg" },
    { id: 2, icon: "fa-x-twitter", url: "#", class: "twitter-bg" },
    { id: 3, icon: "fa-linkedin-in", url: "#", class: "linkedin-bg" },
    { id: 4, icon: "fa-instagram", url: "#", class: "instagram-bg" },
  ];

  return (
    <>
      <footer>
        <div className="footer-area over-hidden pt-110 mb-80">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                {/* Logo & Copyright */}
                <div className="col-xl-4 col-lg-5 col-md-8 col-sm-7 col-12">
                  <div className="footer-widget footer-logo pb-40">
                    <div className="foot-logo mb-30">
                      <img src="images/logo/logo.png" alt="Themes" />
                    </div>
                    <div className="copyright-text">
                      <p className="mb-0">
                        All rights reserved{" "}
                        <a href="#" className="c-theme white-text f-600">
                          Muhammad Awais
                        </a>{" "}
                        © 2025
                      </p>
                    </div>
                  </div>
                </div>

                {/* Follow Me (left column - visible on md/sm only) */}
                <div className="col-xl-3 offset-xl-2 col-lg-3 col-md-4 col-sm-4 col-12 d-none d-sm-block d-lg-none">
                  <div className="footer-widget pb-40">
                    <h4 className="mb-28 mt-2">Follow Me</h4>
                    <ul className="social social-bg text-center d-flex">
                      {socialLinks.map((item) => (
                        <li key={item.id} className="mr-2 rotate-hover">
                          <a
                            href={item.url}
                            className={`${item.class} text-center pr-0 text-white d-block transition-3 rotate`}
                          >
                            <i className={`fa-brands ${item.icon}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="footer-widget pb-40">
                    <h4 className="mb-28 mt-2">Newsletter</h4>
                    <div className="newsletter-form">
                      <form action="#">
                        <div className="subscribe-info position-relative">
                          <input
                            className="sub-name theme-border pl-25 pt-15 pb-15 pr-10 w-100 secondary-color2 border-radius5 bg-transparent"
                            type="email"
                            name="email"
                            placeholder="Submit your email"
                          />
                          <span className="d-block position-absolute theme-color cursor-pointer">
                            <i className="fa-regular fa-envelope" />
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Follow Me (right column - visible on lg & up) */}
                <div className="col-xl-3 offset-xl-2 col-lg-3 col-md-4 col-sm-4 col-12 d-sm-none d-lg-block">
                  <div className="footer-widget pb-40">
                    <h4 className="mb-28 mt-2">Follow Me</h4>
                    <ul className="social social-bg text-center d-flex">
                      {socialLinks.map((item) => (
                        <li key={item.id} className="mr-2 rotate-hover">
                          <a
                            href={item.url}
                            className={`${item.class} text-center pr-0 text-white d-block transition-3 rotate`}
                          >
                            <i className={`fa-brands ${item.icon}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* /row */}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <div id="scroll" className="scrollTop text-right">
        <a
          href="#"
          className="theme-bg primary-color text-center d-inline-block mr-10 transition5"
        >
          <span>
            <i className="fa-solid fa-angle-up" />
          </span>
        </a>
      </div>
    </>
  );
}
