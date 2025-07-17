import { useState, useEffect } from 'react'
import { aboutAPI } from '../services/api'
import toast from 'react-hot-toast'
import FileUpload from '../components/FileUpload'

const About = () => {
  const [aboutData, setAboutData] = useState({
    name: '',
    age: '',
    occupation: '',
    phone: '',
    email: '',
    nationality: '',
    title: '',
    description1: '',
    description2: '',
    signature: '',
    signatureName: '',
    signatureTitle: '',
    image: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const data = await aboutAPI.get()
      if (data) {
        setAboutData(data)
      }
    } catch (error) {
      console.error('Error fetching about data:', error)
      toast.error('Failed to load about data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await aboutAPI.update(aboutData)
      toast.success('About information updated successfully!')
    } catch (error) {
      console.error('Error updating about data:', error)
      toast.error('Failed to update about information')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAboutData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (fieldName) => (fileData) => {
    if (fileData) {
      setAboutData(prev => ({
        ...prev,
        [fieldName]: fileData.url
      }))
    } else {
      setAboutData(prev => ({
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
            About Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your personal and professional information
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={aboutData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="text"
                name="age"
                id="age"
                value={aboutData.age}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-gray-700"
              >
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                value={aboutData.occupation}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={aboutData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={aboutData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700"
              >
                Nationality
              </label>
              <input
                type="text"
                name="nationality"
                id="nationality"
                value={aboutData.nationality}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={aboutData.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="description1"
              className="block text-sm font-medium text-gray-700"
            >
              Description (First Paragraph)
            </label>
            <textarea
              name="description1"
              id="description1"
              rows={4}
              value={aboutData.description1}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="description2"
              className="block text-sm font-medium text-gray-700"
            >
              Description (Second Paragraph)
            </label>
            <textarea
              name="description2"
              id="description2"
              rows={3}
              value={aboutData.description2}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="signatureName"
                className="block text-sm font-medium text-gray-700"
              >
                Signature Name
              </label>
              <input
                type="text"
                name="signatureName"
                id="signatureName"
                value={aboutData.signatureName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="signatureTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Signature Title
              </label>
              <input
                type="text"
                name="signatureTitle"
                id="signatureTitle"
                value={aboutData.signatureTitle}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature Image
              </label>
              <FileUpload
                onFileUpload={handleFileUpload('signature')}
                currentImage={aboutData.signature}
                fieldName="signature"
                placeholder="Upload signature image"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <FileUpload
                onFileUpload={handleFileUpload('image')}
                currentImage={aboutData.image}
                fieldName="image"
                placeholder="Upload profile image"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image
            </label>
            <FileUpload
              onFileUpload={handleFileUpload('BannerImage')}
              currentImage={aboutData.BannerImage}
              fieldName="BannerImage"
              placeholder="Upload banner image"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default About