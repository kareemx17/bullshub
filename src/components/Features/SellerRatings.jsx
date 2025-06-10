import { useState, useEffect } from 'react'
import { FaStar, FaUser, FaComment, FaFilter, FaSort } from 'react-icons/fa'
import { useAuth } from '../Auth/AuthContext'

const SellerRatings = () => {
  const { user } = useAuth()
  const [ratings, setRatings] = useState([])
  const [userProfile, setUserProfile] = useState(null)
  const [filterRating, setFilterRating] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  // Sample data
  useEffect(() => {
    if (user) {
      const sampleProfile = {
        username: user.username,
        averageRating: 4.6,
        totalRatings: 23,
        totalSales: 45,
        memberSince: '2023-08-15',
        responseRate: 95,
        responseTime: '2 hours'
      }
      setUserProfile(sampleProfile)

      const sampleRatings = [
        {
          id: 1,
          reviewer: 'john_doe',
          reviewerVerified: true,
          rating: 5,
          comment: 'Great seller! Item was exactly as described and delivered quickly. Highly recommend!',
          itemName: 'Calculus Textbook',
          date: '2024-01-15',
          helpful: 8
        },
        {
          id: 2,
          reviewer: 'jane_smith',
          reviewerVerified: false,
          rating: 4,
          comment: 'Good transaction overall. Book was in good condition, though there were a few more highlights than mentioned.',
          itemName: 'Chemistry Lab Manual',
          date: '2024-01-12',
          helpful: 3
        },
        {
          id: 3,
          reviewer: 'mike_wilson',
          reviewerVerified: true,
          rating: 5,
          comment: 'Excellent communication and fast response. Would definitely buy from again!',
          itemName: 'TI-84 Calculator',
          date: '2024-01-10',
          helpful: 5
        },
        {
          id: 4,
          reviewer: 'sarah_jones',
          reviewerVerified: true,
          rating: 3,
          comment: 'Item was okay but took longer to receive than expected. Communication could be better.',
          itemName: 'Lab Coat',
          date: '2024-01-08',
          helpful: 2
        },
        {
          id: 5,
          reviewer: 'alex_brown',
          reviewerVerified: false,
          rating: 5,
          comment: 'Perfect condition item and great price. Very happy with my purchase!',
          itemName: 'Engineering Textbook',
          date: '2024-01-05',
          helpful: 6
        }
      ]
      setRatings(sampleRatings)
    }
  }, [user])

  const renderStars = (rating, size = 'sm') => {
    const sizeClass = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    ratings.forEach(rating => {
      distribution[rating.rating]++
    })
    return distribution
  }

  const filteredAndSortedRatings = ratings
    .filter(rating => filterRating === 'all' || rating.rating.toString() === filterRating)
    .sort((a, b) => {
      switch(sortBy) {
        case 'recent':
          return new Date(b.date) - new Date(a.date)
        case 'oldest':
          return new Date(a.date) - new Date(b.date)
        case 'highest':
          return b.rating - a.rating
        case 'lowest':
          return a.rating - b.rating
        case 'helpful':
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  const distribution = getRatingDistribution()

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 text-center py-12">
          <FaStar className="mx-auto text-4xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seller Ratings</h2>
          <p className="text-gray-600 mb-6">
            Rate and review other students to build a trusted marketplace community
          </p>
          <p className="text-gray-500">Please sign in to view ratings and reviews</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <FaStar className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Seller Ratings & Reviews</h1>
              <p className="text-gray-600">Build trust through transparent feedback</p>
            </div>
          </div>

          {/* User Profile Summary */}
          {userProfile && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  <FaUser />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">@{userProfile.username}</h2>
                  <p className="text-gray-600">Member since {new Date(userProfile.memberSince).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {renderStars(Math.round(userProfile.averageRating), 'lg')}
                    <span className="text-2xl font-bold text-gray-900">{userProfile.averageRating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{userProfile.totalRatings} ratings</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{userProfile.totalSales}</div>
                  <p className="text-sm text-gray-600">Total sales</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{userProfile.responseRate}%</div>
                  <p className="text-sm text-gray-600">Response rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{userProfile.responseTime}</div>
                  <p className="text-sm text-gray-600">Avg response</p>
                </div>
              </div>
            </div>
          )}

          {/* Rating Distribution */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{star}</span>
                    <FaStar className="w-3 h-3 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${ratings.length > 0 ? (distribution[star] / ratings.length) * 100 : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{distribution[star]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <FaSort className="text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">
            Reviews ({filteredAndSortedRatings.length})
          </h3>

          {filteredAndSortedRatings.length === 0 ? (
            <div className="text-center py-12">
              <FaComment className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-500">
                {filterRating !== 'all' ? 'Try adjusting your filters' : 'No reviews yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAndSortedRatings.map((rating) => (
                <div key={rating.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {rating.reviewer.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-900">@{rating.reviewer}</h4>
                          {rating.reviewerVerified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          {renderStars(rating.rating)}
                          <p className="text-sm text-gray-500 mt-1">{rating.date}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{rating.comment}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Item: <span className="font-medium">{rating.itemName}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="hover:text-indigo-600 transition-colors">
                            👍 Helpful ({rating.helpful})
                          </button>
                          <button className="hover:text-indigo-600 transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rating Guidelines */}
        <div className="p-6 bg-blue-50 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📝 Rating Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">When rating sellers:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Consider item condition accuracy</li>
                <li>Rate communication quality</li>
                <li>Evaluate transaction smoothness</li>
                <li>Be fair and constructive</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Review best practices:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Be specific about your experience</li>
                <li>Stay professional and respectful</li>
                <li>Focus on the transaction, not personal details</li>
                <li>Help other students make informed decisions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerRatings 