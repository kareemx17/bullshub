import { useState, useEffect } from 'react'
import { FaBookOpen, FaSearch, FaPlus, FaFilter } from 'react-icons/fa'
import { useAuth } from '../Auth/AuthContext'

const TextbookExchange = () => {
  const { user } = useAuth()
  const [textbooks, setTextbooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTextbook, setNewTextbook] = useState({
    title: '',
    author: '',
    isbn: '',
    course: '',
    condition: 'good',
    price: '',
    description: '',
    type: 'sell' // sell or trade
  })

  // Sample data - replace with actual API calls
  useEffect(() => {
    const sampleTextbooks = [
      {
        id: 1,
        title: "Calculus: Early Transcendentals",
        author: "James Stewart",
        isbn: "978-1285741550",
        course: "MAC 2311",
        condition: "good",
        price: 120,
        description: "Excellent condition, barely used. All pages intact.",
        type: "sell",
        seller: "john_doe",
        posted: "2024-01-15"
      },
      {
        id: 2,
        title: "Introduction to Algorithms",
        author: "Thomas Cormen",
        isbn: "978-0262033848",
        course: "COP 4530",
        condition: "fair",
        price: 0,
        description: "Looking to trade for Organic Chemistry textbook",
        type: "trade",
        seller: "jane_smith",
        posted: "2024-01-10"
      },
      {
        id: 3,
        title: "Organic Chemistry",
        author: "David Klein",
        isbn: "978-1118452288",
        course: "CHM 2210",
        condition: "excellent",
        price: 200,
        description: "Brand new, never opened. Still has plastic wrap.",
        type: "sell",
        seller: "mike_wilson",
        posted: "2024-01-12"
      }
    ]
    setTextbooks(sampleTextbooks)
  }, [])

  const filteredTextbooks = textbooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || book.type === filterCategory
    return matchesSearch && matchesFilter
  })

  const handleAddTextbook = (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign in to list textbooks')
      return
    }

    const textbook = {
      ...newTextbook,
      id: Date.now(),
      seller: user.username,
      posted: new Date().toISOString().split('T')[0]
    }

    setTextbooks([textbook, ...textbooks])
    setNewTextbook({
      title: '',
      author: '',
      isbn: '',
      course: '',
      condition: 'good',
      price: '',
      description: '',
      type: 'sell'
    })
    setShowAddForm(false)
  }

  const getConditionColor = (condition) => {
    switch(condition) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'fair': return 'text-yellow-600 bg-yellow-100'
      case 'poor': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <FaBookOpen className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Textbook Exchange Program</h1>
              <p className="text-gray-600">Trade textbooks with other students for future semesters</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or course code..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="sell">For Sale</option>
                <option value="trade">For Trade</option>
              </select>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus className="w-4 h-4" />
                List Textbook
              </button>
            </div>
          </div>
        </div>

        {/* Add Textbook Form */}
        {showAddForm && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-xl font-semibold mb-4">List Your Textbook</h3>
            <form onSubmit={handleAddTextbook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Book Title"
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTextbook.title}
                onChange={(e) => setNewTextbook({...newTextbook, title: e.target.value})}
              />
              <input
                type="text"
                placeholder="Author"
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTextbook.author}
                onChange={(e) => setNewTextbook({...newTextbook, author: e.target.value})}
              />
              <input
                type="text"
                placeholder="ISBN (optional)"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTextbook.isbn}
                onChange={(e) => setNewTextbook({...newTextbook, isbn: e.target.value})}
              />
              <input
                type="text"
                placeholder="Course Code (e.g., MAC 2311)"
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTextbook.course}
                onChange={(e) => setNewTextbook({...newTextbook, course: e.target.value})}
              />
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTextbook.condition}
                onChange={(e) => setNewTextbook({...newTextbook, condition: e.target.value})}
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTextbook.type}
                onChange={(e) => setNewTextbook({...newTextbook, type: e.target.value})}
              >
                <option value="sell">For Sale</option>
                <option value="trade">For Trade</option>
              </select>
              {newTextbook.type === 'sell' && (
                <input
                  type="number"
                  placeholder="Price ($)"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newTextbook.price}
                  onChange={(e) => setNewTextbook({...newTextbook, price: e.target.value})}
                />
              )}
              <textarea
                placeholder="Description and additional details..."
                className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                value={newTextbook.description}
                onChange={(e) => setNewTextbook({...newTextbook, description: e.target.value})}
              />
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  List Textbook
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Textbook Listings */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">
              Available Textbooks ({filteredTextbooks.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTextbooks.map((book) => (
              <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    book.type === 'sell' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {book.type === 'sell' ? 'For Sale' : 'For Trade'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(book.condition)}`}>
                    {book.condition}
                  </span>
                </div>

                <h4 className="font-bold text-lg mb-2 text-gray-900">{book.title}</h4>
                <p className="text-gray-600 mb-1">by {book.author}</p>
                <p className="text-sm text-gray-500 mb-2">Course: {book.course}</p>
                
                {book.type === 'sell' && (
                  <p className="text-2xl font-bold text-green-600 mb-2">${book.price}</p>
                )}

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{book.description}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>by @{book.seller}</span>
                  <span>{book.posted}</span>
                </div>

                <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  {book.type === 'sell' ? 'Contact Seller' : 'Propose Trade'}
                </button>
              </div>
            ))}
          </div>

          {filteredTextbooks.length === 0 && (
            <div className="text-center py-12">
              <FaBookOpen className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No textbooks found</h3>
              <p className="text-gray-500">
                {searchTerm || filterCategory !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Be the first to list a textbook!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TextbookExchange 