import { useState, useEffect } from 'react'
import { useAuth } from '../Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaSave, FaTimes, FaShoppingBag, FaHeart, FaEye, FaCamera } from 'react-icons/fa'

const Account = () => {
  const { user, logout, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({
    username: user?.username || '',
    email: '',
    fullName: '',
    bio: '',
    location: 'University of South Florida',
    joinDate: 'December 2024'
  })

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8000/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const userData = await response.json()
          setUserInfo({
            username: userData.username || user.username,
            email: userData.email || '',
            fullName: userData.full_name || '',
            bio: userData.bio || '',
            location: userData.location || 'University of South Florida',
            joinDate: new Date(userData.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            }) || 'December 2024'
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userInfo.username,
          email: userInfo.email,
          full_name: userInfo.fullName,
          bio: userInfo.bio,
          location: userInfo.location
        })
      })

      if (response.ok) {
        console.log('User info updated successfully')
        setIsEditing(false)
        // Refresh user data in context
        await refreshUser()
      } else {
        console.error('Failed to update user info')
      }
    } catch (error) {
      console.error('Error updating user info:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleCancel = () => {
    setUserInfo({
      username: user?.username || '',
      email: '',
      fullName: '',
      bio: '',
      location: 'University of South Florida',
      joinDate: 'December 2024'
    })
    setIsEditing(false)
  }

  const stats = [
    { label: 'Items Listed', value: '12', icon: FaShoppingBag, color: 'bg-blue-500' },
    { label: 'Items Sold', value: '8', icon: FaEye, color: 'bg-green-500' },
    { label: 'Favorites', value: '23', icon: FaHeart, color: 'bg-red-500' },
    { label: 'Rating', value: '4.9', icon: FaSave, color: 'bg-yellow-500' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-1">Manage your profile and account settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                                 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
                    <FaUser className="w-16 h-16" />
                  </div>
                  <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg 
                                   border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                    <FaCamera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{userInfo.fullName || userInfo.username}</h2>
                <p className="text-gray-500">@{userInfo.username}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Active member</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 
                           rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 
                           flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl 
                           hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaUser />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                {isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 
                               transition-colors duration-200 flex items-center gap-2"
                    >
                      <FaSave className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 
                               transition-colors duration-200 flex items-center gap-2"
                    >
                      <FaTimes className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.username}
                      onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {userInfo.username}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.fullName}
                      onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {userInfo.fullName || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {userInfo.email || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.location}
                      onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {userInfo.location}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={userInfo.bio}
                      onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                               focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      rows="3"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {userInfo.bio || 'No bio provided yet.'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FaCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Member Since</div>
                      <div className="text-sm text-gray-500">{userInfo.joinDate}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Email Verified</div>
                      <div className="text-sm text-green-600">Verified</div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <FaUser className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Account Type</div>
                      <div className="text-sm text-gray-500">Student Member</div>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account 