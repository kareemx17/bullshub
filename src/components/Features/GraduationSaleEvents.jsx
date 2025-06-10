import { useState, useEffect } from 'react'
import { FaGraduationCap, FaCalendarAlt, FaTag, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { useAuth } from '../Auth/AuthContext'

const GraduationSaleEvents = () => {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')

  // Sample data
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: "Spring 2024 Graduation Mega Sale",
        description: "Graduating seniors selling textbooks, electronics, and dorm essentials at massive discounts!",
        date: "2024-05-15",
        time: "10:00 AM - 4:00 PM",
        location: "USF Student Center Plaza",
        organizer: "USF Student Government",
        participants: 45,
        status: "upcoming",
        categories: ["Textbooks", "Electronics", "Furniture", "Lab Equipment"],
        estimatedSavings: "50-80%"
      },
      {
        id: 2,
        title: "Engineering Senior Clearance",
        description: "Engineering students selling specialized textbooks, calculators, and lab equipment.",
        date: "2024-04-20",
        time: "12:00 PM - 6:00 PM",
        location: "Engineering Building Courtyard",
        organizer: "Engineering Student Association",
        participants: 28,
        status: "upcoming",
        categories: ["Engineering Books", "Calculators", "Lab Equipment"],
        estimatedSavings: "40-70%"
      },
      {
        id: 3,
        title: "Business School Book Bonanza",
        description: "Business students clearing out their textbook collections before graduation.",
        date: "2024-03-15",
        time: "9:00 AM - 3:00 PM",
        location: "Business School Atrium",
        organizer: "Business Student Council",
        participants: 35,
        status: "completed",
        categories: ["Business Books", "Software", "Calculators"],
        estimatedSavings: "45-65%"
      },
      {
        id: 4,
        title: "Pre-Med Student Sale",
        description: "Pre-med and biology students selling MCAT prep, textbooks, and lab materials.",
        date: "2024-02-28",
        time: "11:00 AM - 5:00 PM",
        location: "Health Sciences Building",
        organizer: "Pre-Med Society",
        participants: 22,
        status: "completed",
        categories: ["Medical Books", "MCAT Prep", "Lab Equipment"],
        estimatedSavings: "30-60%"
      }
    ]
    setEvents(sampleEvents)

    // Filter upcoming events
    const today = new Date()
    const upcoming = sampleEvents.filter(event => new Date(event.date) > today)
    setUpcomingEvents(upcoming)
  }, [])

  const filteredEvents = events.filter(event => {
    if (filterStatus === 'all') return true
    return event.status === filterStatus
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-gray-600 bg-gray-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isEventSoon = (dateString) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-pink-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Graduation Sale Events</h1>
              <p className="text-gray-600">Special events where graduating students sell their materials at discounted prices</p>
            </div>
          </div>

          {/* Upcoming Events Alert */}
          {upcomingEvents.length > 0 && (
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-pink-900 mb-2">
                🎉 Don&apos;t Miss Out!
              </h3>
              <p className="text-pink-800 mb-3">
                {upcomingEvents.length} upcoming graduation sale event{upcomingEvents.length > 1 ? 's' : ''} with incredible deals!
              </p>
              <div className="flex flex-wrap gap-2">
                {upcomingEvents.slice(0, 2).map(event => (
                  <span key={event.id} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                    {event.title} - {formatDate(event.date)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Filter */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Past Events</option>
            </select>
          </div>
        </div>

        {/* Events List */}
        <div className="p-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <FaGraduationCap className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500">Check back later for upcoming graduation sale events</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                        {isEventSoon(event.date) && event.status === 'upcoming' && (
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                            Coming Soon!
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Save {event.estimatedSavings}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="w-4 h-4 text-pink-500" />
                      <div>
                        <div className="font-medium text-gray-900">{formatDate(event.date)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="w-4 h-4 text-pink-500" />
                      <div>
                        <div className="font-medium text-gray-900">{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="w-4 h-4 text-pink-500" />
                      <div>
                        <div className="font-medium text-gray-900">{event.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaTag className="w-4 h-4 text-pink-500" />
                      <div>
                        <div className="font-medium text-gray-900">{event.participants} Sellers</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Categories:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.categories.map(category => (
                        <span key={category} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Organized by <span className="font-medium text-gray-700">{event.organizer}</span>
                    </div>
                    <div className="flex gap-3">
                      {event.status === 'upcoming' && (
                        <>
                          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                            Set Reminder
                          </button>
                          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                            View Details
                          </button>
                        </>
                      )}
                      {event.status === 'completed' && (
                        <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                          View Summary
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Event Guidelines */}
        <div className="p-6 bg-purple-50 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            📋 Event Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
            <div>
              <h4 className="font-medium mb-2">For Buyers:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Arrive early for the best selection</li>
                <li>Bring cash and exact change when possible</li>
                <li>Inspect items carefully before purchasing</li>
                <li>Be respectful and patient with sellers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Sellers (Graduating Students):</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Register in advance to secure your spot</li>
                <li>Price items competitively for quick sales</li>
                <li>Bring tables, bags, and change for transactions</li>
                <li>Clean and organize items for better presentation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Participate */}
        {user && (
          <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🎓 Graduating Soon?
            </h3>
            <p className="text-gray-600 mb-4">
              Are you graduating this semester? Host your own sale event or join an existing one to sell your materials to fellow students!
            </p>
            <div className="flex gap-3">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition-colors">
                Organize Sale Event
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors">
                Join Existing Event
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GraduationSaleEvents 