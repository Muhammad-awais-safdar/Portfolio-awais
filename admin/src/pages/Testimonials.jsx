import { useState, useEffect } from 'react'
import { testimonialsAPI } from '../services/api'
import toast from 'react-hot-toast'
import { PlusIcon, PencilIcon, TrashIcon, StarIcon } from '@heroicons/react/24/outline'
import FileUpload from '../components/FileUpload'

const Testimonials = () => {
  const [testimonialsList, setTestimonialsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    testimonial: '',
    rating: 5,
    image: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialsAPI.getAll()
      setTestimonialsList(data || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      toast.error('Failed to load testimonials data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const submitData = {
        ...formData,
        rating: parseInt(formData.rating)
      }

      if (editingItem) {
        await testimonialsAPI.update(editingItem._id, submitData)
        toast.success('Testimonial updated successfully!')
      } else {
        await testimonialsAPI.create(submitData)
        toast.success('Testimonial added successfully!')
      }
      
      await fetchTestimonials()
      resetForm()
    } catch (error) {
      console.error('Error saving testimonial:', error)
      toast.error('Failed to save testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      position: item.position,
      company: item.company,
      testimonial: item.testimonial,
      rating: item.rating || 5,
      image: item.image || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return
    }

    try {
      await testimonialsAPI.delete(id)
      toast.success('Testimonial deleted successfully!')
      await fetchTestimonials()
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      toast.error('Failed to delete testimonial')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      company: '',
      testimonial: '',
      rating: 5,
      image: ''
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill={i < rating ? 'currentColor' : 'none'}
      />
    ))
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
            Testimonials
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage client testimonials and feedback
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Testimonial
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={resetForm}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Client Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g., John Doe"
                          />
                        </div>

                        <div>
                          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                            Position *
                          </label>
                          <input
                            type="text"
                            name="position"
                            id="position"
                            required
                            value={formData.position}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g., CEO"
                          />
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Company *
                          </label>
                          <input
                            type="text"
                            name="company"
                            id="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g., Tech Solutions Inc."
                          />
                        </div>

                        <div>
                          <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700">
                            Testimonial *
                          </label>
                          <textarea
                            name="testimonial"
                            id="testimonial"
                            rows={4}
                            required
                            value={formData.testimonial}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="Client's testimonial..."
                          />
                        </div>

                        <div>
                          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating *
                          </label>
                          <select
                            name="rating"
                            id="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          >
                            <option value={5}>5 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={2}>2 Stars</option>
                            <option value={1}>1 Star</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Image
                          </label>
                          <FileUpload
                            onFileUpload={handleFileUpload('image')}
                            currentImage={formData.image}
                            fieldName="image"
                            placeholder="Upload profile image"
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

      {/* Testimonials List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {testimonialsList.length === 0 ? (
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
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No testimonials</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first testimonial.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Add Testimonial
              </button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {testimonialsList.map((testimonial) => (
              <li key={testimonial._id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {testimonial.image && (
                          <img
                            className="h-10 w-10 rounded-full mr-3"
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">{testimonial.position} at {testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="text-primary-600 hover:text-primary-500"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial._id)}
                          className="text-red-600 hover:text-red-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="mt-2 text-sm text-gray-700 italic">"{testimonial.testimonial}"</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Testimonials