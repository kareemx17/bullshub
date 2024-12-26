import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const success = await login(username, password)
      if (success) {
        navigate('/')
      } else {
        alert('Login failed. Please check your credentials and try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('An error occurred during login. Please try again.')
    }
  }

  return (
    <div className='mt-5 grow flex flex-col items-center justify-around h-[800px] animate-fadeIn'>
      <div className='w-96'>
        <div className='border-solid border border-gray-300 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-slideUp'>
          <h1 className='text-3xl mb-6 font-bold text-gray-800 animate-slideDown'>Sign in</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className='transform transition-all duration-200 hover:scale-[1.02]'>
              <label htmlFor="username" className="block text-sm text-black font-bold">Username</label>
              <input
                type="text"
                id="username"
                placeholder='your_username'
                className="border-black w-full px-3 py-2 mt-1 border text-sm rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 transition-all duration-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='transform transition-all duration-200 hover:scale-[1.02]'>
              <label htmlFor="password" className="block text-sm font-bold text-black">Password</label>
              <input
                type="password"
                id="password"
                className="border-black w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
            >
              Sign in
            </button>
          </form>
          <p className='text-sm text-center mt-6 text-gray-600'>A step closer to shop at BullsBuy</p>
        </div>
        <div className='text-center mt-6 space-y-4 animate-slideUp delay-200'>
          <p className='text-sm text-gray-600'>
            New to BullsBuy? <Link to='/register' className='text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200'>Sign up</Link>
          </p>
          <Link 
            to='/register' 
            className='block w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md text-center'
          >
            Create your BullsBuy account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
