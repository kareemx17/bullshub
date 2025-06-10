import { useState, useEffect } from 'react'
import { FaBell, FaSearch, FaPlus, FaTrash, FaBookOpen } from 'react-icons/fa'
import { useAuth } from '../Auth/AuthContext'

const CourseNotifications = () => {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newCourse, setNewCourse] = useState('')
  const [recentNotifications, setRecentNotifications] = useState([])

  // Popular course codes at USF
  const popularCourses = [
    'MAC 2311', 'MAC 2312', 'CHM 2045', 'CHM 2046', 'PHY 2048', 'PHY 2049',
    'COP 4530', 'EGN 3000', 'ENC 1101', 'ENC 1102', 'PSY 2012', 'BSC 2010',
    'ECO 2013', 'STA 2023', 'CGS 2100', 'AMH 2010', 'POS 2041', 'SOC 2000'
  ]

  // Sample data
  useEffect(() => {
    if (user) {
      const sampleSubscriptions = [
        {
          id: 1,
          courseCode: 'MAC 2311',
          courseName: 'Calculus I',
          subscribed: '2024-01-10',
          notificationCount: 5,
          lastNotification: '2024-01-15'
        },
        {
          id: 2,
          courseCode: 'CHM 2045',
          courseName: 'General Chemistry I',
          subscribed: '2024-01-08',
          notificationCount: 3,
          lastNotification: '2024-01-14'
        },
        {
          id: 3,
          courseCode: 'COP 4530',
          courseName: 'Data Structures',
          subscribed: '2024-01-05',
          notificationCount: 7,
          lastNotification: '2024-01-16'
        }
      ]
      setSubscriptions(sampleSubscriptions)

      const sampleNotifications = [
        {
          id: 1,
          courseCode: 'MAC 2311',
          itemName: 'Calculus Early Transcendentals 8th Edition',
          price: 120,
          type: 'textbook',
          time: '2 hours ago',
          seller: 'john_doe'
        },
        {
          id: 2,
          courseCode: 'CHM 2045',
          itemName: 'Lab Safety Goggles',
          price: 15,
          type: 'lab-equipment',
          time: '5 hours ago',
          seller: 'jane_smith'
        },
        {
          id: 3,
          courseCode: 'COP 4530',
          itemName: 'Programming Laptop - Dell XPS',
          price: 800,
          type: 'electronics',
          time: '1 day ago',
          seller: 'mike_wilson'
        },
        {
          id: 4,
          courseCode: 'MAC 2311',
          itemName: 'TI-84 Plus Calculator',
          price: 75,
          type: 'calculator',
          time: '2 days ago',
          seller: 'sarah_jones'
        }
      ]
      setRecentNotifications(sampleNotifications)
    }
  }, [user])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign in to subscribe to course notifications')
      return
    }

    if (!newCourse.trim()) return

    const courseCode = newCourse.toUpperCase().trim()
    
    // Check if already subscribed
    if (subscriptions.some(sub => sub.courseCode === courseCode)) {
      alert('You are already subscribed to this course')
      return
    }

    const subscription = {
      id: Date.now(),
      courseCode: courseCode,
      courseName: getCourseName(courseCode),
      subscribed: new Date().toISOString().split('T')[0],
      notificationCount: 0,
      lastNotification: null
    }

    setSubscriptions([subscription, ...subscriptions])
    setNewCourse('')
  }

  const handleUnsubscribe = (subscriptionId) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId))
  }

  const getCourseName = (courseCode) => {
    const courseNames = {
      'MAC 2311': 'Calculus I',
      'MAC 2312': 'Calculus II',
      'CHM 2045': 'General Chemistry I',
      'CHM 2046': 'General Chemistry II',
      'PHY 2048': 'Physics I',
      'PHY 2049': 'Physics II',
      'COP 4530': 'Data Structures',
      'EGN 3000': 'Engineering Ethics',
      'ENC 1101': 'English Composition I',
      'ENC 1102': 'English Composition II',
      'PSY 2012': 'General Psychology',
      'BSC 2010': 'Biology I',
      'ECO 2013': 'Principles of Economics',
      'STA 2023': 'Elementary Statistics',
      'CGS 2100': 'Computer Fundamentals',
      'AMH 2010': 'American History',
      'POS 2041': 'American Government',
      'SOC 2000': 'Introduction to Sociology'
    }
    return courseNames[courseCode] || 'Course'
  }

  const getItemTypeIcon = (type) => {
    switch(type) {
      case 'textbook': return '📚'
      case 'lab-equipment': return '🔬'
      case 'electronics': return '💻'
      case 'calculator': return '🧮'
      default: return '📦'
    }
  }

  const filteredPopularCourses = popularCourses.filter(course =>
    course.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !subscriptions.some(sub => sub.courseCode === course)
  )

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 text-center py-12">
          <FaBell className="mx-auto text-4xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course-Based Notifications</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to course codes to get alerts when related items are posted
          </p>
          <p className="text-gray-500">Please sign in to subscribe to course notifications</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <FaBell className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course-Based Notifications</h1>
              <p className="text-gray-600">Subscribe to course codes and get notified about relevant items</p>
            </div>
          </div>

          {/* Subscribe Form */}
          <form onSubmit={handleSubscribe} className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter course code (e.g., MAC 2311, CHM 2045)..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              Subscribe
            </button>
          </form>

          {/* Popular Courses */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Courses</h3>
            <div className="flex flex-wrap gap-2">
              {filteredPopularCourses.slice(0, 12).map(course => (
                <button
                  key={course}
                  onClick={() => setNewCourse(course)}
                  className="bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-yellow-800 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {course}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Subscriptions */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold mb-4">
            Your Subscriptions ({subscriptions.length})
          </h3>

          {subscriptions.length === 0 ? (
            <div className="text-center py-8">
              <FaBookOpen className="mx-auto text-3xl text-gray-400 mb-3" />
              <p className="text-gray-500">No course subscriptions yet. Subscribe to courses to get notifications!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{subscription.courseCode}</h4>
                      <p className="text-gray-600 text-sm">{subscription.courseName}</p>
                    </div>
                    <button
                      onClick={() => handleUnsubscribe(subscription.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Notifications:</span>
                      <span className="font-medium text-gray-900">{subscription.notificationCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subscribed:</span>
                      <span className="text-gray-500">{subscription.subscribed}</span>
                    </div>
                    {subscription.lastNotification && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Alert:</span>
                        <span className="text-gray-500">{subscription.lastNotification}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Notifications */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Recent Notifications ({recentNotifications.length})
          </h3>

          {recentNotifications.length === 0 ? (
            <div className="text-center py-8">
              <FaBell className="mx-auto text-3xl text-gray-400 mb-3" />
              <p className="text-gray-500">No notifications yet. Subscribe to courses to start receiving alerts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{getItemTypeIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{notification.itemName}</h4>
                          <p className="text-sm text-gray-600">
                            Listed for <span className="font-bold text-green-600">${notification.price}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            {notification.courseCode}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>by @{notification.seller}</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      View Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🔔 Notification Settings
          </h3>
          <p className="text-gray-600 mb-4">
            Customize how you receive notifications for your subscribed courses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700">In-app notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700">SMS notifications (premium)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700">Daily digest email</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseNotifications 