import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.getServices();
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (service, index) => {
    // If service has an icon class (Font Awesome), use it
    if (service.icon && service.icon.startsWith('fa')) {
      return <i className={`${service.icon} fa-3x`} style={{ color: '#fff' }}></i>;
    }
    
    // If service has an image URL, use it
    if (service.icon && (service.icon.startsWith('http') || service.icon.startsWith('images'))) {
      return <img className="position-relative z-index1" src={service.icon} alt="icon" />;
    }
    
    // Fallback to default icons based on index
    const defaultIcons = [
      "images/icon/ser-icon1.png",
      "images/icon/ser-icon2.png", 
      "images/icon/ser-icon3.png",
      "images/icon/ser-icon4.png"
    ];
    
    const iconIndex = index % defaultIcons.length;
    return <img className="position-relative z-index1" src={defaultIcons[iconIndex]} alt="icon" />;
  };

  const renderServiceFeatures = (features) => {
    if (!features || features.length === 0) return null;
    
    return (
      <ul className="service-features mt-15">
        {features.map((feature, index) => (
          <li key={index} className="text-white mb-5">
            <i className="fas fa-check-circle mr-10"></i>
            {feature}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return (
      <div className="service-area section-bg over-hidden pt-160 pb-145">
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
    <>
      <div
        id="service"
        className="service-area section-bg over-hidden pt-160 pb-145"
      >
        <div className="service-wrapper position-relative">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="title text-center">
                  <span className="theme-color text-uppercase d-block mb-6">
                    Service
                  </span>
                  <h2 className="text-white">What I offer</h2>
                </div>
              </div>
            </div>
            <div className="row service-wrappers mt-80">
              {services.map((service, index) => (
                <div
                  key={service._id || index}
                  className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-duration={service.aosDuration || 1000}
                  data-aos-delay={service.aosDelay || 0}
                >
                  <div className="single-service shadow-hover transition3 primary-bg border-radius10 pl-50 pr-50 pt-65 pb-55 mb-25">
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-4 col-4 text-lg-center">
                        <div className="service-ser-icon d-inline-block text-center position-relative mb-15">
                          {getServiceIcon(service, index)}
                          <div className="service-small-circle service-circle rounded-circle transition5 secondary-bg d-inline-block position-absolute"></div>
                          <div className="service-large-circle service-circle rounded-circle transition5 secondary-bg d-inline-block position-absolute"></div>
                        </div>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="service-text d-inline-block ml-xl-2">
                          <h3 className="mb-15">{service.title}</h3>
                          <p className="mb-0">{service.description}</p>
                          {renderServiceFeatures(service.features)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-icon position-absolute d-none d-md-inline-block z-index1 zoom-animation">
            <img src="images/shape/content-shape2.png" alt="shape 2" />
          </div>
        </div>
      </div>
    </>
  );
}
