import { useState, useEffect } from 'react'
import { portfolioAPI } from '../services/api'
import toast from 'react-hot-toast'
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import FileUpload from '../components/FileUpload'

const Portfolio = () => {
  const [portfolioList, setPortfolioList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    category: '',
    title: '',
    image: '',
    largeImage: '',
    description: '',
    client: '',
    duration: '',
    task: '',
    budget: '',
    tags: '',
    link: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const data = await portfolioAPI.getAll()
      setPortfolioList(data || [])
    } catch (error) {
      console.error('Error fetching portfolio:', error)
      toast.error('Failed to load portfolio data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const portfolioData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }

      if (editingItem) {
        await portfolioAPI.update(editingItem._id, portfolioData)
        toast.success('Portfolio item updated successfully!')
      } else {
        await portfolioAPI.create(portfolioData)
        toast.success('Portfolio item added successfully!')
      }
      
      await fetchPortfolio()
      resetForm()
    } catch (error) {
      console.error('Error saving portfolio:', error)
      toast.error('Failed to save portfolio item')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      id: item.id || '',
      category: item.category || '',
      title: item.title || '',
      image: item.image || '',
      largeImage: item.largeImage || '',
      description: item.description || '',
      client: item.client || '',
      duration: item.duration || '',
      task: item.task || '',
      budget: item.budget || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
      link: item.link || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) {
      return
    }

    try {
      await portfolioAPI.delete(id)
      toast.success('Portfolio item deleted successfully!')
      await fetchPortfolio()
    } catch (error) {
      console.error('Error deleting portfolio:', error)
      toast.error('Failed to delete portfolio item')
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      category: '',
      title: '',
      image: '',
      largeImage: '',
      description: '',
      client: '',
      duration: '',
      task: '',
      budget: '',
      tags: '',
      link: ''
    })
    setEditingItem(null)
    setShowForm(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (fieldName) => (fileData) => {
    if (fileData) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: fileData.url
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: ''
      }))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Portfolio
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your portfolio projects and showcase your work
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Project
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={resetForm}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-96 overflow-y-auto">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Project Title *
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category *
                          </label>
                          <select
                            name="category"
                            id="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          >
                            <option value="">Select Category</option>
                            <option value="Web Design">Web Design</option>
                            <option value="Development">Development</option>
                            <option value="Branding">Branding</option>
                            <option value="Security">Security</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                            Client
                          </label>
                          <input
                            type="text"
                            name="client"
                            id="client"
                            value={formData.client}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                            Duration
                          </label>
                          <input
                            type="text"
                            name="duration"
                            id="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g., 3 Weeks"
                          />
                        </div>

                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                            Budget
                          </label>
                          <input
                            type="text"
                            name="budget"
                            id="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g., $2500"
                          />
                        </div>

                        <div>
                          <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                            Project Link
                          </label>
                          <input
                            type="url"
                            name="link"
                            id="link"
                            value={formData.link}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label htmlFor="task" className="block text-sm font-medium text-gray-700">
                          Task/Role
                        </label>
                        <input
                          type="text"
                          name="task"
                          id="task"
                          value={formData.task}
                          onChange={handleChange}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="e.g., UI/UX Design, Frontend Development"
                        />
                      </div>

                      <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows={3}
                          value={formData.description}
                          onChange={handleChange}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>

                      <div className="mt-4">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="tags"
                          id="tags"
                          value={formData.tags}
                          onChange={handleChange}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="e.g., React, Laravel, E-commerce"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thumbnail Image
                          </label>
                          <FileUpload
                            onFileUpload={handleFileUpload('image')}
                            currentImage={formData.image}
                            fieldName="image"
                            placeholder="Upload thumbnail image"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Large Image
                          </label>
                          <FileUpload
                            onFileUpload={handleFileUpload('largeImage')}
                            currentImage={formData.largeImage}
                            fieldName="largeImage"
                            placeholder="Upload large image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : (editingItem ? 'Update' : 'Add')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Grid */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {portfolioList.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No portfolio items</h3>
            <p className="mt-1 text-sm text-gray-500">Start showcasing your work by adding portfolio items.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Add Project
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {portfolioList.map((item) => (
              <div key={item._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {item.image && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {item.category}
                    </span>
                    <div className="flex space-x-1">
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-500"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-primary-600 hover:text-primary-500"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  {item.client && (
                    <p className="text-xs text-gray-500">Client: {item.client}</p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Portfolio