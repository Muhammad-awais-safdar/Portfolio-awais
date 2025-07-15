import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if needed in the future
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Generic CRUD operations
export const apiService = {
  // Get all items from an endpoint
  getAll: async (endpoint) => {
    const response = await api.get(`/${endpoint}`)
    return response.data
  },

  // Get single item by ID
  getById: async (endpoint, id) => {
    const response = await api.get(`/${endpoint}/${id}`)
    return response.data
  },

  // Create new item
  create: async (endpoint, data) => {
    const response = await api.post(`/${endpoint}`, data)
    return response.data
  },

  // Update item by ID
  update: async (endpoint, id, data) => {
    const response = await api.put(`/${endpoint}/${id}`, data)
    return response.data
  },

  // Delete item by ID
  delete: async (endpoint, id) => {
    const response = await api.delete(`/${endpoint}/${id}`)
    return response.data
  },
}

// Specific API endpoints
export const aboutAPI = {
  get: () => apiService.getAll('about'),
  update: (data) => api.put('/about', data).then(response => response.data),
}

export const educationAPI = {
  getAll: () => apiService.getAll('education'),
  getById: (id) => apiService.getById('education', id),
  create: (data) => apiService.create('education', data),
  update: (id, data) => apiService.update('education', id, data),
  delete: (id) => apiService.delete('education', id),
}

export const experienceAPI = {
  getAll: () => apiService.getAll('experience'),
  getById: (id) => apiService.getById('experience', id),
  create: (data) => apiService.create('experience', data),
  update: (id, data) => apiService.update('experience', id, data),
  delete: (id) => apiService.delete('experience', id),
}

export const skillsAPI = {
  getAll: () => apiService.getAll('skills'),
  getById: (id) => apiService.getById('skills', id),
  create: (data) => apiService.create('skills', data),
  update: (id, data) => apiService.update('skills', id, data),
  delete: (id) => apiService.delete('skills', id),
}

export const portfolioAPI = {
  getAll: () => apiService.getAll('portfolio'),
  getById: (id) => apiService.getById('portfolio', id),
  create: (data) => apiService.create('portfolio', data),
  update: (id, data) => apiService.update('portfolio', id, data),
  delete: (id) => apiService.delete('portfolio', id),
}

export const servicesAPI = {
  getAll: () => apiService.getAll('services'),
  getById: (id) => apiService.getById('services', id),
  create: (data) => apiService.create('services', data),
  update: (id, data) => apiService.update('services', id, data),
  delete: (id) => apiService.delete('services', id),
}

export const testimonialsAPI = {
  getAll: () => apiService.getAll('testimonials'),
  getById: (id) => apiService.getById('testimonials', id),
  create: (data) => apiService.create('testimonials', data),
  update: (id, data) => apiService.update('testimonials', id, data),
  delete: (id) => apiService.delete('testimonials', id),
}

export const pricingAPI = {
  getAll: () => apiService.getAll('pricing'),
  getById: (id) => apiService.getById('pricing', id),
  create: (data) => apiService.create('pricing', data),
  update: (id, data) => apiService.update('pricing', id, data),
  delete: (id) => apiService.delete('pricing', id),
}

export const awardsAPI = {
  getAll: () => apiService.getAll('awards'),
  getById: (id) => apiService.getById('awards', id),
  create: (data) => apiService.create('awards', data),
  update: (id, data) => apiService.update('awards', id, data),
  delete: (id) => apiService.delete('awards', id),
}

export const brandsAPI = {
  getAll: () => apiService.getAll('brands'),
  getById: (id) => apiService.getById('brands', id),
  create: (data) => apiService.create('brands', data),
  update: (id, data) => apiService.update('brands', id, data),
  delete: (id) => apiService.delete('brands', id),
}

export const funFactsAPI = {
  getAll: () => apiService.getAll('funfacts'),
  getById: (id) => apiService.getById('funfacts', id),
  create: (data) => apiService.create('funfacts', data),
  update: (id, data) => apiService.update('funfacts', id, data),
  delete: (id) => apiService.delete('funfacts', id),
}

export const introFeaturesAPI = {
  getAll: () => apiService.getAll('intro-features'),
  getById: (id) => apiService.getById('intro-features', id),
  create: (data) => apiService.create('intro-features', data),
  update: (id, data) => apiService.update('intro-features', id, data),
  delete: (id) => apiService.delete('intro-features', id),
}

export default api