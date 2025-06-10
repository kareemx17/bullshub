import {Link, useNavigate} from "react-router-dom"
import { useAuth } from './Auth/AuthContext'
import { FaUser, FaSignOutAlt, FaUserCircle, FaBell, FaHeart, FaMapMarkerAlt, FaCubes } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

const Header = () => {
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const featuresDropdownRef = useRef(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    navigate('/')
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
      if (featuresDropdownRef.current && !featuresDropdownRef.current.contains(event.target)) {
        setShowFeaturesDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef, featuresDropdownRef])
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

          {/* Features Dropdown */}
          <div className="flex-grow max-w-md mx-4">
            <div className="relative" ref={featuresDropdownRef}>
              <button
                onClick={() => setShowFeaturesDropdown(!showFeaturesDropdown)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                         px-6 py-3 rounded-xl transition-all duration-200 border border-white/20
                         hover:border-white/40 group w-full justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-white font-medium">Features</span>
                <svg className="w-4 h-4 text-white group-hover:text-yellow-300 transition-transform duration-200 
                               transform group-hover:rotate-180" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Features Dropdown Menu */}
              {showFeaturesDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 
                               py-2 z-50 backdrop-blur-sm">
                  <div className="py-2">
                    <Link
                      to="/"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      </svg>
                      <span>Marketplace</span>
                    </Link>
                    
                    <Link
                      to="/sell"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Sell Items</span>
                    </Link>

                    <Link
                      to="/meetup"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                      <span>Campus Meetup</span>
                    </Link>

                    <Link
                      to="/features/textbook-exchange"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>Textbook Exchange</span>
                    </Link>

                    <Link
                      to="/features/study-buddy"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Study Buddy Finder</span>
                    </Link>

                    <Link
                      to="/features/semester-alerts"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h5c.552 0 1.02-.45 1.02-1s-.468-1-1.02-1H4a1 1 0 100 2zM4 15h9c.552 0 1.02-.45 1.02-1s-.468-1-1.02-1H4a1 1 0 100 2zM4 11h11c.552 0 1.02-.45 1.02-1s-.468-1-1.02-1H4a1 1 0 100 2z" />
                      </svg>
                      <span>Semester Alerts</span>
                    </Link>

                    <Link
                      to="/features/course-notifications"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Course Notifications</span>
                    </Link>

                    <Link
                      to="/features/student-verification"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span>Student Verification</span>
                    </Link>

                    <Link
                      to="/features/seller-ratings"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span>Seller Ratings</span>
                    </Link>

                    <Link
                      to="/features/graduation-sale-events"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 
                               transition-colors duration-200"
                      onClick={() => setShowFeaturesDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <span>Graduation Sale Events</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
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

export default Header
