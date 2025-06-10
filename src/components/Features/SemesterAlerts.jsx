import { useState, useEffect } from 'react'
import { FaCalendarAlt, FaBell, FaPlus, FaTrash } from 'react-icons/fa'
import { useAuth } from '../Auth/AuthContext'

const SemesterAlerts = () => {
  const { user } = useAuth()
  const [alerts, setAlerts] = useState([])
  const [newAlert, setNewAlert] = useState({
    itemName: '',
    category: '',
    targetPrice: '',
    semester: 'spring-2024',
    priority: 'medium'
  })
  const [showCreateForm, setShowCreateForm] = useState(false)

  const categories = [
    'Textbooks', 'Electronics', 'Lab Equipment', 'Software', 'Calculators',
    'Art Supplies', 'Furniture', 'Clothing', 'Other'
  ]

  const semesters = [
    { value: 'spring-2024', label: 'Spring 2024' },
    { value: 'summer-2024', label: 'Summer 2024' },
    { value: 'fall-2024', label: 'Fall 2024' },
    { value: 'spring-2025', label: 'Spring 2025' }
  ]

  // Sample data
  useEffect(() => {
    if (user) {
      const sampleAlerts = [
        {
          id: 1,
          itemName: "Organic Chemistry Textbook",
          category: "Textbooks",
          targetPrice: 150,
          semester: "spring-2024",
          priority: "high",
          created: "2024-01-10",
          status: "active",
          matches: 2
        },
        {
          id: 2,
          itemName: "TI-84 Calculator",
          category: "Calculators",
          targetPrice: 80,
          semester: "spring-2024",
          priority: "medium",
          created: "2024-01-08",
          status: "active",
          matches: 0
        },
        {
          id: 3,
          itemName: "Lab Coat",
          category: "Lab Equipment",
          targetPrice: 30,
          semester: "fall-2024",
          priority: "low",
          created: "2024-01-05",
          status: "active",
          matches: 1
        }
      ]
      setAlerts(sampleAlerts)
    }
  }, [user])

  const handleCreateAlert = (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign in to create alerts')
      return
    }

    const alert = {
      ...newAlert,
      id: Date.now(),
      created: new Date().toISOString().split('T')[0],
      status: 'active',
      matches: 0,
      targetPrice: parseFloat(newAlert.targetPrice)
    }

    setAlerts([alert, ...alerts])
    setNewAlert({
      itemName: '',
      category: '',
      targetPrice: '',
      semester: 'spring-2024',
      priority: 'medium'
    })
    setShowCreateForm(false)
  }

  const handleDeleteAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getUpcomingSemesters = () => {
    const now = new Date()
    const currentMonth = now.getMonth()
    
    // Determine upcoming semesters based on current date
    let upcomingSemesters = []
    
    if (currentMonth >= 0 && currentMonth <= 4) { // Jan-May: Spring semester
      upcomingSemesters = ['summer-2024', 'fall-2024', 'spring-2025']
    } else if (currentMonth >= 5 && currentMonth <= 7) { // Jun-Aug: Summer semester
      upcomingSemesters = ['fall-2024', 'spring-2025']
    } else { // Sep-Dec: Fall semester
      upcomingSemesters = ['spring-2025']
    }

    return upcomingSemesters
  }

  const upcomingSemesters = getUpcomingSemesters()

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 text-center py-12">
          <FaCalendarAlt className="mx-auto text-4xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Semester Alerts</h2>
          <p className="text-gray-600 mb-6">
            Get notified when items you need become available before each semester starts
          </p>
          <p className="text-gray-500">Please sign in to create and manage semester alerts</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Semester Alerts</h1>
              <p className="text-gray-600">Get notified when items you need become available</p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            Create Alert
          </button>
        </div>

        {/* Create Alert Form */}
        {showCreateForm && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Create New Alert</h3>
            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Item name (e.g., Calculus Textbook)"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={newAlert.itemName}
                  onChange={(e) => setNewAlert({...newAlert, itemName: e.target.value})}
                />
                <select
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={newAlert.category}
                  onChange={(e) => setNewAlert({...newAlert, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Target price ($)"
                  min="0"
                  step="0.01"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                />
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={newAlert.semester}
                  onChange={(e) => setNewAlert({...newAlert, semester: e.target.value})}
                >
                  {semesters.map(semester => (
                    <option key={semester.value} value={semester.value}>{semester.label}</option>
                  ))}
                </select>
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={newAlert.priority}
                  onChange={(e) => setNewAlert({...newAlert, priority: e.target.value})}
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Create Alert
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Alerts List */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">
              Your Alerts ({alerts.length})
            </h3>
          </div>

          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <FaBell className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts created yet</h3>
              <p className="text-gray-500">Create your first alert to get notified about items you need</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-gray-900">{alert.itemName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                          {alert.priority} priority
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {alert.category}
                        </span>
                        <span>Target: ${alert.targetPrice}</span>
                        <span>
                          {semesters.find(s => s.value === alert.semester)?.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {alert.matches} {alert.matches === 1 ? 'match' : 'matches'}
                        </div>
                        <div className="text-xs text-gray-500">found</div>
                      </div>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {alert.matches > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 text-sm font-medium">
                        🎉 Great news! We found {alert.matches} item{alert.matches === 1 ? '' : 's'} that match your alert.
                      </p>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium mt-1">
                        View matches →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Semester Preparation */}
        {upcomingSemesters.length > 0 && (
          <div className="p-6 bg-blue-50 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              📅 Upcoming Semester Preparation
            </h3>
            <p className="text-blue-800 mb-4">
              Start preparing for upcoming semesters! Create alerts now to find the best deals before classes start.
            </p>
            <div className="flex flex-wrap gap-2">
              {upcomingSemesters.map(semesterValue => {
                const semester = semesters.find(s => s.value === semesterValue)
                return (
                  <span key={semesterValue} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {semester?.label}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SemesterAlerts 