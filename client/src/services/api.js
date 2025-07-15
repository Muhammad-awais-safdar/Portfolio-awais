const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  // About
  getAbout: async () => {
    const response = await fetch(`${API_BASE_URL}/about`);
    return response.json();
  },

  // Skills
  getSkills: async () => {
    const response = await fetch(`${API_BASE_URL}/skills`);
    return response.json();
  },

  // Experience
  getExperience: async () => {
    const response = await fetch(`${API_BASE_URL}/experience`);
    return response.json();
  },

  // Education
  getEducation: async () => {
    const response = await fetch(`${API_BASE_URL}/education`);
    return response.json();
  },

  // Portfolio
  getPortfolio: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio`);
    return response.json();
  },

  getPortfolioById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/${id}`);
    return response.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    return response.json();
  },

  // Services
  getServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    return response.json();
  },

  // Fun Facts
  getFunFacts: async () => {
    const response = await fetch(`${API_BASE_URL}/funfacts`);
    return response.json();
  },

  // Brands
  getBrands: async () => {
    const response = await fetch(`${API_BASE_URL}/brands`);
    return response.json();
  },

  // Pricing
  getPricing: async () => {
    const response = await fetch(`${API_BASE_URL}/pricing`);
    return response.json();
  },

  // Awards
  getAwards: async () => {
    const response = await fetch(`${API_BASE_URL}/awards`);
    return response.json();
  },

  // Intro Features
  getIntroFeatures: async () => {
    const response = await fetch(`${API_BASE_URL}/intro-features`);
    return response.json();
  }
};

export default api;