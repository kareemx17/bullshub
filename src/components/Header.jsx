import {Link, useNavigate} from "react-router-dom"
import PropTypes from 'prop-types'
import { useAuth } from './Auth/AuthContext'
import { FaUser, FaSignOutAlt, FaUserCircle, FaBell, FaHeart, FaMapMarkerAlt, FaCubes } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

const Header = ({search, setSearch}) => {
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    navigate('/')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])
  return (
    <header className="bg-green-900 shadow-xl border-b-4 border-green-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link 
              to={'/'} 
              className="group flex items-center gap-3 hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 
                               rounded-2xl shadow-xl flex items-center justify-center transform 
                               group-hover:rotate-12 transition-transform duration-300">
                  <FaCubes className="text-white text-xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 
                               rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-2xl font-bold bg-gradient-to-r from-white to-yellow-200 
                               bg-clip-text text-transparent tracking-wide">
                  Bulls Hub
                </span>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full 
                               transform origin-left group-hover:scale-x-125 transition-transform duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Search Section */}
          <div className="flex-grow max-w-md mx-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <div className="relative">
                <input
                  className="w-full p-3 pl-4 pr-12 rounded-xl border-2 border-green-700 bg-white/95 backdrop-blur-sm
                           focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500
                           placeholder-gray-500 text-gray-800 font-medium shadow-lg
                           transition-all duration-200 hover:shadow-xl"
                  id='search'
                  type='text'
                  role='searchbox'
                  placeholder='Search products...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link 
              to='/sell' 
              className='bg-yellow-500 hover:bg-yellow-400 text-white font-semibold px-6 py-3 rounded-xl
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
                       border-2 border-yellow-400 hover:border-yellow-300 flex-shrink-0'
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Sell
              </span>
            </Link>
            
            {user ? (
              /* Authenticated User Menu */
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button className="relative p-3 text-white hover:text-yellow-300 transition-colors duration-200">
                  <FaBell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    3
                  </span>
                </button>

                {/* Favorites */}
                <Link 
                  to="/favorites" 
                  className="p-3 text-white hover:text-yellow-300 transition-colors duration-200"
                >
                  <FaHeart className="w-5 h-5" />
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                             px-4 py-3 rounded-xl transition-all duration-200 border border-white/20
                             hover:border-white/40 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                                   flex items-center justify-center text-white font-bold text-sm">
                      <FaUserCircle className="w-6 h-6" />
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-white font-medium text-sm">{user.username || 'User'}</div>
                      <div className="text-green-200 text-xs">Online</div>
                    </div>
                    <svg className="w-4 h-4 text-white group-hover:text-yellow-300 transition-transform duration-200 
                                   transform group-hover:rotate-180" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 
                                   py-2 z-50 backdrop-blur-sm">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                                         flex items-center justify-center text-white font-bold">
                            <FaUserCircle className="w-8 h-8" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.username || 'User'}</div>
                            <div className="text-sm text-gray-500">Bull&apos;s Market Member</div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/account"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                                   transition-colors duration-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaUser className="w-4 h-4 text-gray-400" />
                          <span>My Account</span>
                        </Link>
                        
                        <Link
                          to="/my-listings"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                                   transition-colors duration-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <span>My Listings</span>
                        </Link>

                        <Link
                          to="/favorites"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                                   transition-colors duration-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaHeart className="w-4 h-4 text-gray-400" />
                          <span>Favorites</span>
                        </Link>

                        <Link
                          to="/messages"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                                   transition-colors duration-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>Messages</span>
                        </Link>

                        <Link
                          to="/meetup"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                                   transition-colors duration-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                          <span>Campus Meetup</span>
                        </Link>
                      </div>

                      {/* Logout Button */}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 
                                   transition-colors duration-200 w-full text-left"
                        >
                          <FaSignOutAlt className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Non-authenticated buttons */
              <div className="flex items-center space-x-3">
                <Link 
                  to='/meetup' 
                  className='bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-3 rounded-xl
                           shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
                           border-2 border-green-400 hover:border-green-300 flex-shrink-0 hidden sm:flex'
                >
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    Meetup
                  </span>
                </Link>
                
                <Link 
                  to='/signin' 
                  className='relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                           text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl 
                           transform hover:-translate-y-1 hover:scale-105 transition-all duration-300
                           border-2 border-transparent hover:border-white/20 flex-shrink-0
                           animate-pulse hover:animate-none overflow-hidden group'
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                                 transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                                 transition-transform duration-700"></div>
                  <span className="relative flex items-center gap-2 z-10">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Join Now
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired
}

export default Header
