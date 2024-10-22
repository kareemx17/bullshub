import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
    
    const data = new FormData()
    data.append('title', formData.title)
    data.append('price', formData.price)
    data.append('description', formData.description)
    data.append('category', formData.category)
    data.append('contact', `${formData.contactType}:${formData.contactValue}`)
    data.append('photo', formData.photo)

    try {
      const response = await axios.post('http://localhost:8000/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('Product added successfully:', response.data)
      // Navigate to homepage after successful submission
      navigate('/')
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h1 className='text-2xl font-bold text-gray-800 text-center mb-6'>Sell Your Item</h1>

        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium' htmlFor='title'>Item Name</label>
            <input
              id='title'
              name='title'
              type='text'
              value={formData.title}
              onChange={handleInputChange}
              placeholder='Name of what you are trying to sell'
              className='border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-sky-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium' htmlFor='price'>Price</label>
            <input
              id='price'
              name='price'
              type='text'
              value={formData.price}
              onChange={handleInputChange}
              placeholder='Price (e.g., $10 or Free)'
              className='border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-sky-500'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium' htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              placeholder='Describe your item'
              className='border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-sky-500'
              rows='3'
              required
            ></textarea>
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium' htmlFor='category'>Category</label>
            <select
              id='category'
              name='category'
              value={formData.category}
              onChange={handleInputChange}
              className='border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-sky-500'
              required
            >
              <option value=''>Select a category</option>
              <option value='books'>Books</option>
              <option value='electronics'>Electronics</option>
              <option value='furniture'>Furniture</option>
              <option value='clothing'>Clothing</option>
              <option value='other'>Other</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium'>Contact Preference</label>
            <div className='flex items-center space-x-4'>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  name='contactType'
                  value='email'
                  checked={formData.contactType === 'email'}
                  onChange={handleInputChange}
                  className='form-radio'
                />
                <span className='ml-2'>Email</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  name='contactType'
                  value='instagram'
                  checked={formData.contactType === 'instagram'}
                  onChange={handleInputChange}
                  className='form-radio'
                />
                <span className='ml-2'>Instagram</span>
              </label>
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700 font-medium' htmlFor='contactValue'>
              {formData.contactType === 'email' ? 'Email Address' : 'Instagram Username'}
            </label>
            <input
              id='contactValue'
              name='contactValue'
              type={formData.contactType === 'email' ? 'email' : 'text'}
              value={formData.contactValue}
              onChange={handleInputChange}
              placeholder={formData.contactType === 'email' ? 'yourname@example.com' : '@yourusername'}
              className='border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-sky-500'
              required
            />
          </div>

          <div className='flex flex-col items-center'>
            <label
              htmlFor='photo'
              className='w-full h-40 border border-dashed border-gray-300 text-gray-600 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition'
            >
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="h-full w-full object-cover rounded-lg" />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16l6-6 4 4 8-8M14 16l4 4M3 6l6-6 4 4 8-8" />
                  </svg>
                  <span>Upload a photo</span>
                  <span className='text-sm text-gray-400'>(JPEG, PNG, JPG)</span>
                </>
              )}
            </label>
            <input
              className='hidden'
              id='photo'
              name='photo'
              type='file'
              onChange={handleFileChange}
              accept='image/jpeg, image/png, image/jpg'
            />
          </div>

          <button type="submit" className='bg-sky-500 text-white rounded-lg py-2 w-full hover:bg-sky-600 transition duration-300'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Sell
