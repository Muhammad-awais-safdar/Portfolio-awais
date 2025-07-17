const API_BASE_URL = 'https://portfolio-backend-es4q.onrender.com';

const handleApiCall = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed for ${url}:`, error);
    throw error;
  }
};

const api = {
  // About
  getAbout: async () => {
    return await handleApiCall(`${API_BASE_URL}/about`);
  },

  // Skills
  getSkills: async () => {
    return await handleApiCall(`${API_BASE_URL}/skills`);
  },

  // Experience
  getExperience: async () => {
    return await handleApiCall(`${API_BASE_URL}/experience`);
  },

  // Education
  getEducation: async () => {
    return await handleApiCall(`${API_BASE_URL}/education`);
  },

  // Portfolio
  getPortfolio: async () => {
    return await handleApiCall(`${API_BASE_URL}/portfolio`);
  },

  getPortfolioById: async (id) => {
    return await handleApiCall(`${API_BASE_URL}/portfolio/${id}`);
  },

  // Testimonials
  getTestimonials: async () => {
    return await handleApiCall(`${API_BASE_URL}/testimonials`);
  },

  // Services
  getServices: async () => {
    return await handleApiCall(`${API_BASE_URL}/services`);
  },

  // Fun Facts
  getFunFacts: async () => {
    return await handleApiCall(`${API_BASE_URL}/funfacts`);
  },

  // Brands
  getBrands: async () => {
    return await handleApiCall(`${API_BASE_URL}/brands`);
  },

  // Pricing
  getPricing: async () => {
    return await handleApiCall(`${API_BASE_URL}/pricing`);
  },

  // Awards
  getAwards: async () => {
    return await handleApiCall(`${API_BASE_URL}/awards`);
  },

  // Intro Features
  getIntroFeatures: async () => {
    return await handleApiCall(`${API_BASE_URL}/intro-features`);
  }
};

export default api;