import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await register(username, password)
    if (success) {
      navigate('/signin')
    } else {
      alert('Registration failed. Please try again.')
    }
  }

  return (
    <div className='mt-5 grow flex flex-col items-center justify-around h-[800px]'>
      <div className='w-96 h border-solid border border-gray-300 rounded-lg p-6'>
        <h1 className='text-3xl mb-5'>Register</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm text-black font-bold">Username</label>
            <input
              type="text"
              id="username"
              placeholder='your_username'
              className="border-black w-full px-3 py-2 mt-1 border text-sm rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-black">Password</label>
            <input
              type="password"
              id="password"
              className="border-black w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-2 py-1 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          >
            Sign up
          </button>
        </form>
        <p className='text-sm text-center mt-5'>Become a part of BullsBuy</p>
      </div>
    </div>
  )
}

export default Register
