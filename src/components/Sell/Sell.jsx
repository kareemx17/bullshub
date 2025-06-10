import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaUpload, FaTag, FaDollarSign, FaUser, FaEnvelope, FaInstagram, FaCamera, FaCheckCircle } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Sell = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    contactType: 'email', // Default to email
    contactValue: '',
    photo: null
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prevState => ({
      ...prevState,
      photo: file
    }))

    // Create a preview of the uploaded image
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewImage(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const data = new FormData()
    data.append('title', formData.title)
    data.append('price', formData.price)
    data.append('description', formData.description)
    data.append('category', formData.category)
    data.append('contact', `${formData.contactType}:${formData.contactValue}`)
    data.append('photo', formData.photo)

    try {
      const response = await axios.post(`${API_URL}/products`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('Product added successfully:', response.data)
      setSubmitSuccess(true)
      // Navigate to homepage after showing success
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('Error adding product:', error)
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Success!</h1>
          <p className="text-gray-600 mb-6">Your item has been listed successfully. Redirecting you to the marketplace...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">List Your Item</h1>
              <p className="text-gray-600 mt-1">Share what you&apos;re selling with fellow students</p>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Item Details Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaTag className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Item Details</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="title">
                      Item Name *
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="What are you selling?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">
                        <FaDollarSign className="inline mr-1" />
                        Price *
                      </label>
                      <input
                        id="price"
                        name="price"
                        type="text"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="$10 or Free"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="books">📚 Books</option>
                        <option value="electronics">💻 Electronics</option>
                        <option value="lab equipment">🔬 Lab Equipment</option>
                        <option value="project kit">🛠️ Project Kits</option>
                        <option value="furniture">🪑 Furniture</option>
                        <option value="supplies">📝 Supplies</option>
                        <option value="study materials">📖 Study Materials</option>
                        <option value="appliances">🏠 Appliances</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your item in detail. Include condition, usage, and any other relevant information..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      rows="4"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaCamera className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Photo</h2>
                </div>

                <div className="space-y-4">
                  <label
                    htmlFor="photo"
                    className="relative block w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    {previewImage ? (
                      <div className="relative h-full">
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="h-full w-full object-cover rounded-xl" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <FaUpload className="text-white text-2xl" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-500">
                        <FaUpload className="text-4xl mb-4 group-hover:text-blue-500 transition-colors duration-200" />
                        <p className="text-lg font-medium">Upload a photo</p>
                        <p className="text-sm text-gray-400 mt-1">JPEG, PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </label>
                  <input
                    className="hidden"
                    id="photo"
                    name="photo"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/jpeg, image/png, image/jpg"
                    required
                  />
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaUser className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How should buyers contact you? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="relative">
                        <input
                          type="radio"
                          name="contactType"
                          value="email"
                          checked={formData.contactType === 'email'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.contactType === 'email' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          <div className="flex items-center gap-3">
                            <FaEnvelope className={`text-lg ${formData.contactType === 'email' ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className={`font-medium ${formData.contactType === 'email' ? 'text-blue-900' : 'text-gray-700'}`}>
                              Email
                            </span>
                          </div>
                        </div>
                      </label>

                      <label className="relative">
                        <input
                          type="radio"
                          name="contactType"
                          value="instagram"
                          checked={formData.contactType === 'instagram'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.contactType === 'instagram' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          <div className="flex items-center gap-3">
                            <FaInstagram className={`text-lg ${formData.contactType === 'instagram' ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className={`font-medium ${formData.contactType === 'instagram' ? 'text-blue-900' : 'text-gray-700'}`}>
                              Instagram
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contactValue">
                      {formData.contactType === 'email' ? 'Email Address' : 'Instagram Username'} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {formData.contactType === 'email' ? (
                          <FaEnvelope className="text-gray-400" />
                        ) : (
                          <FaInstagram className="text-gray-400" />
                        )}
                      </div>
                      <input
                        id="contactValue"
                        name="contactValue"
                        type={formData.contactType === 'email' ? 'email' : 'text'}
                        value={formData.contactValue}
                        onChange={handleInputChange}
                        placeholder={formData.contactType === 'email' ? 'yourname@usf.edu' : '@yourusername'}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl 
                         hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 
                         shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Publishing your item...
                  </>
                ) : (
                  <>
                    <FaUpload />
                    List My Item
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar Tips */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Selling Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Take clear, well-lit photos from multiple angles</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Write detailed descriptions including condition and usage</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Price competitively by checking similar items</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Respond quickly to interested buyers</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🛡️ Safety First</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Meet in public places on campus</p>
                <p className="text-sm text-gray-600">• Use your college email for verification</p>
                <p className="text-sm text-gray-600">• Inspect items before exchanging money</p>
                <p className="text-sm text-gray-600">• Trust your instincts</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average sale time</span>
                  <span className="text-sm font-semibold text-gray-900">2-3 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Most popular category</span>
                  <span className="text-sm font-semibold text-gray-900">Books</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Free listings</span>
                  <span className="text-sm font-semibold text-gray-900">Always</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sell
