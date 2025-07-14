import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active nav on scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // adjust as needed
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // close mobile menu on click
    }
  };

  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`transparent-header header-area ${
            isSticky ? "sticky-menu" : ""
          }`}
        >
          <div className="header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-5">
                  <div className="logo mt-50 mb-50 transition5">
                    <a className="header-logo" href="#">
                      <img src="images/logo/logo.png" alt="Logo" />
                    </a>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-9 col-sm-8 col-7 pl-0 d-flex justify-content-end align-items-center">
                  <div className="main-menu d-none d-xl-block">
                    <nav>
                      <ul className="d-block">
                        {[
                          "home",
                          "about",
                          "work",
                          "service",
                          "contact",
                          "blog",
                        ].map((id) => (
                          <li key={id}>
                            <a
                              href={`#${id}`}
                              onClick={handleNavClick}
                              className={activeSection === id ? "active" : ""}
                            >
                              {id.charAt(0).toUpperCase() + id.slice(1)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                  <div className="header-btn pl-45">
                    <a href="#" className="text-uppercase d-inline-block">
                      download cv
                    </a>
                  </div>
                  <div className="mobile-m-bar d-block d-xl-none ml-30">
                    <button
                      onClick={() => setMobileMenuOpen(true)}
                      className="mobile-menubar theme-color"
                    >
                      <i className="fa-solid fa-bars"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* side-mobile-menu */}
      <div
        className={`side-mobile-menu pt-15 pb-30 pl-30 pr-20 pb-100 ${
          mobileMenuOpen ? "open" : ""
        }`}
      >
        <div className="d-flex justify-content-between w-100">
          <div className="close-icon d-inline-block float-right clear-both mt-20 mb-15">
            <button onClick={() => setMobileMenuOpen(false)}>
              <span className="icon-clear theme-color">
                <i className="fa fa-times"></i>
              </span>
            </button>
          </div>
        </div>
        <div className="mobile-menu mt-10">
          <ul>
            {["home", "about", "work", "service", "contact", "blog"].map(
              (id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={handleNavClick}
                    className={activeSection === id ? "active" : ""}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <h5 className="text-white text-center mt-35 pb-1 d-inline-block ml-3">
          Follow me
        </h5>
        <ul className="social social-bg text-center d-flex mt-10 ml-3">
          <li className="mr-2 rotate-hover">
            <a
              className="facebook-bg text-center pr-0 text-white d-block transition-3 rotate"
              href="#"
            >
              <i className="fa-brands fa-facebook-f" />
            </a>
          </li>
          <li className="mr-2 rotate-hover">
            <a
              className="twitter-bg text-center pr-0 text-white d-block rotate transition-3"
              href="#"
            >
              <i className="fa-brands fa-x-twitter" />
            </a>
          </li>
          <li className="mr-2 rotate-hover">
            <a
              className="linkedin-bg text-center pr-0 text-white d-block rotate transition-3"
              href="#"
            >
              <i className="fa-brands fa-linkedin-in" />
            </a>
          </li>
          <li className="mr-2 rotate-hover">
            <a
              className="instagram-bg text-center pr-0 text-white d-block rotate transition-3"
              href="#"
            >
              <i className="fa-brands fa-instagram" />
            </a>
          </li>
        </ul>
      </div>

      {/* overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="body-overlay"
        />
      )}
    </>
  );
}
