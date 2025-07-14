import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Map of section ids to custom titles
  const sectionTitles = {
    home: "Home - Muhammad Awais",
    about: "About Me - Muhammad Awais",
    work: "My Work - Muhammad Awais",
    service: "Services - Muhammad Awais",
    contact: "Contact - Muhammad Awais",
  };

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section highlight + update document title
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            setActiveSection(currentId);
            // Update document title
            if (sectionTitles[currentId]) {
              document.title = sectionTitles[currentId];
            }
          }
        });
      },
      { threshold: 0.6 }
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
      setMobileMenuOpen(false);
      // Also update title on click immediately
      if (sectionTitles[targetId]) {
        document.title = sectionTitles[targetId];
      }
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
                  <div className="logo mt-50 mb-50">
                    <a className="header-logo" href="/">
                      <img src="images/logo/logo.png" alt="Logo" />
                    </a>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-9 col-sm-8 col-7 d-flex justify-content-end align-items-center">
                  <div className="main-menu d-none d-xl-block">
                    <nav>
                      <ul>
                        {[
                          "home",
                          "about",
                          "work",
                          "service",
                          "contact",
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
                      Download CV
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

      {/* Side mobile menu */}
      <div className={`side-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="close-icon mt-20 mb-15 text-right">
          <button onClick={() => setMobileMenuOpen(false)}>
            <span className="icon-clear theme-color">
              <i className="fa fa-times"></i>
            </span>
          </button>
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
        <h5 className="text-center mt-35 pb-1">Follow me</h5>
        <ul className="social text-center d-flex justify-content-center mt-10">
          <li className="mr-2">
            <a className="facebook-bg text-white d-block" href="#">
              <i className="fa-brands fa-facebook-f" />
            </a>
          </li>
          <li className="mr-2">
            <a className="twitter-bg text-white d-block" href="#">
              <i className="fa-brands fa-x-twitter" />
            </a>
          </li>
          <li className="mr-2">
            <a className="linkedin-bg text-white d-block" href="#">
              <i className="fa-brands fa-linkedin-in" />
            </a>
          </li>
          <li className="mr-2">
            <a className="instagram-bg text-white d-block" href="#">
              <i className="fa-brands fa-instagram" />
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="body-overlay"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
