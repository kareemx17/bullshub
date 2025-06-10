import { useState, useEffect } from 'react'
import { FaUserFriends, FaSearch, FaPlus, FaGraduationCap, FaClock } from 'react-icons/fa'
import { useAuth } from '../Auth/AuthContext'

const StudyBuddyFinder = () => {
  const { user } = useAuth()
  const [studyGroups, setStudyGroups] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroup, setNewGroup] = useState({
    courseName: '',
    courseCode: '',
    subject: '',
    description: '',
    meetingTime: '',
    location: '',
    maxMembers: 4,
    studyGoals: []
  })

  // Sample data
  useEffect(() => {
    const sampleGroups = [
      {
        id: 1,
        courseName: "Calculus I",
        courseCode: "MAC 2311",
        subject: "Mathematics",
        description: "Looking for serious study partners for upcoming midterm. We meet twice a week.",
        creator: "john_doe",
        members: ["john_doe", "jane_smith"],
        maxMembers: 5,
        meetingTime: "Tuesdays & Thursdays 6PM",
        location: "Library Study Room 204",
        studyGoals: ["Midterm Prep", "Homework Help"],
        created: "2024-01-10",
        active: true
      },
      {
        id: 2,
        courseName: "Organic Chemistry",
        courseCode: "CHM 2210",
        subject: "Chemistry",
        description: "Chemistry study group focusing on reaction mechanisms and lab prep.",
        creator: "mike_wilson",
        members: ["mike_wilson", "sarah_jones", "alex_brown"],
        maxMembers: 4,
        meetingTime: "Mondays 7PM",
        location: "Chemistry Building Lounge",
        studyGoals: ["Lab Prep", "Exam Review"],
        created: "2024-01-08",
        active: true
      },
      {
        id: 3,
        courseName: "Data Structures",
        courseCode: "COP 4530",
        subject: "Computer Science",
        description: "Programming study group. Working on algorithms and coding assignments together.",
        creator: "emma_davis",
        members: ["emma_davis", "tom_garcia"],
        maxMembers: 6,
        meetingTime: "Wednesdays 5PM",
        location: "Engineering Building Lab",
        studyGoals: ["Coding Practice", "Project Help"],
        created: "2024-01-12",
        active: true
      }
    ]
    setStudyGroups(sampleGroups)
  }, [])

  const subjects = [
    'Mathematics', 'Chemistry', 'Physics', 'Biology', 'Computer Science',
    'Engineering', 'Psychology', 'History', 'English', 'Business'
  ]

  const studyGoalOptions = [
    'Exam Review', 'Homework Help', 'Lab Prep', 'Project Help',
    'Midterm Prep', 'Final Prep', 'Coding Practice', 'Paper Writing'
  ]

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = filterSubject === 'all' || group.subject === filterSubject
    return matchesSearch && matchesSubject && group.active
  })

  const handleCreateGroup = (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign in to create study groups')
      return
    }

    const group = {
      ...newGroup,
      id: Date.now(),
      creator: user.username,
      members: [user.username],
      created: new Date().toISOString().split('T')[0],
      active: true
    }

    setStudyGroups([group, ...studyGroups])
    setNewGroup({
      courseName: '',
      courseCode: '',
      subject: '',
      description: '',
      meetingTime: '',
      location: '',
      maxMembers: 4,
      studyGoals: []
    })
    setShowCreateForm(false)
  }

  const handleJoinGroup = (groupId) => {
    if (!user) {
      alert('Please sign in to join study groups')
      return
    }

    setStudyGroups(groups =>
      groups.map(group =>
        group.id === groupId && group.members.length < group.maxMembers
          ? { ...group, members: [...group.members, user.username] }
          : group
      )
    )
  }

  const toggleStudyGoal = (goal) => {
    setNewGroup(prev => ({
      ...prev,
      studyGoals: prev.studyGoals.includes(goal)
        ? prev.studyGoals.filter(g => g !== goal)
        : [...prev.studyGoals, goal]
    }))
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <FaUserFriends className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Study Buddy Finder</h1>
              <p className="text-gray-600">Find study partners and join study groups for your courses</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by course name, code, or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus className="w-4 h-4" />
                Create Group
              </button>
            </div>
          </div>
        </div>

        {/* Create Group Form */}
        {showCreateForm && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Create Study Group</h3>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Course Name (e.g., Calculus I)"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newGroup.courseName}
                  onChange={(e) => setNewGroup({...newGroup, courseName: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Course Code (e.g., MAC 2311)"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newGroup.courseCode}
                  onChange={(e) => setNewGroup({...newGroup, courseCode: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newGroup.subject}
                  onChange={(e) => setNewGroup({...newGroup, subject: e.target.value})}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Max Members"
                  min="2"
                  max="10"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newGroup.maxMembers}
                  onChange={(e) => setNewGroup({...newGroup, maxMembers: parseInt(e.target.value)})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Meeting Time (e.g., Tuesdays 6PM)"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newGroup.meetingTime}
                  onChange={(e) => setNewGroup({...newGroup, meetingTime: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Meeting Location"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newGroup.location}
                  onChange={(e) => setNewGroup({...newGroup, location: e.target.value})}
                />
              </div>

              <textarea
                placeholder="Group description and study goals..."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-24 resize-none"
                value={newGroup.description}
                onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Study Goals</label>
                <div className="flex flex-wrap gap-2">
                  {studyGoalOptions.map(goal => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleStudyGoal(goal)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        newGroup.studyGoals.includes(goal)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Create Group
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

        {/* Study Groups */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">
              Active Study Groups ({filteredGroups.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <div key={group.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{group.courseName}</h4>
                    <p className="text-purple-600 font-medium">{group.courseCode}</p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {group.subject}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{group.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaClock className="w-4 h-4" />
                    <span>{group.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaGraduationCap className="w-4 h-4" />
                    <span>{group.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {group.studyGoals.map(goal => (
                    <span key={goal} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {goal}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{group.members.length}/{group.maxMembers} members</span>
                    <span className="mx-2">•</span>
                    <span>by @{group.creator}</span>
                  </div>
                  
                  {group.members.length < group.maxMembers && 
                   (!user || !group.members.includes(user.username)) && (
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Join Group
                    </button>
                  )}
                  
                  {user && group.members.includes(user.username) && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Joined
                    </span>
                  )}
                  
                  {group.members.length >= group.maxMembers && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      Full
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <FaUserFriends className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No study groups found</h3>
              <p className="text-gray-500">
                {searchTerm || filterSubject !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Be the first to create a study group!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudyBuddyFinder 