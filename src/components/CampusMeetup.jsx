import { useState } from 'react'
import { FaMapMarkerAlt, FaClock, FaUsers, FaWifi, FaCoffee, FaBook, FaParking, FaStar, FaPhone, FaGraduationCap } from 'react-icons/fa'

const CampusMeetup = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const meetupSpots = [
    {
      id: 1,
      name: "Marshall Student Center (MSC)",
      category: "indoor",
      description: "The heart of campus life with multiple floors and gathering areas",
      features: ["Free WiFi", "Food Court", "Study Areas", "Events"],
      hours: "6:00 AM - 11:00 PM",
      capacity: "Large (500+ people)",
      image: "/api/placeholder/400/250",
      location: "4202 E Fowler Ave, Tampa, FL 33620",
      coordinates: { lat: 28.0587, lng: -82.4153 },
      rating: 4.8,
      tips: ["Best spots are on the 2nd floor", "Food court gets crowded 11AM-2PM", "Quiet study areas on 3rd floor"],
      contact: "(813) 974-2832"
    },
    {
      id: 2,
      name: "Library Lawn",
      category: "outdoor",
      description: "Beautiful outdoor space perfect for casual meetups and studying",
      features: ["Open Space", "Shade Trees", "Nearby Parking", "Scenic"],
      hours: "24/7 (Open Space)",
      capacity: "Medium (50-100 people)",
      image: "/api/placeholder/400/250",
      location: "Near Tampa Library, USF Campus",
      coordinates: { lat: 28.0565, lng: -82.4130 },
      rating: 4.6,
      tips: ["Great for morning meetups", "Bring blankets for ground seating", "Check weather conditions"],
      contact: "Outdoor Space - No Phone"
    },
    {
      id: 3,
      name: "Starbucks @ Barnes & Noble",
      category: "cafe",
      description: "Cozy coffee shop atmosphere perfect for small group meetings",
      features: ["Coffee & Snacks", "Free WiFi", "Indoor Seating", "Quiet Environment"],
      hours: "7:00 AM - 9:00 PM",
      capacity: "Small (20-30 people)",
      image: "/api/placeholder/400/250",
      location: "4202 E Fowler Ave, Tampa, FL 33620",
      coordinates: { lat: 28.0582, lng: -82.4148 },
      rating: 4.5,
      tips: ["Less crowded after 3PM", "Free refills on drip coffee", "Power outlets available"],
      contact: "(813) 974-2729"
    },
    {
      id: 4,
      name: "Juniper-Poplar Hall Courtyard",
      category: "outdoor",
      description: "Central courtyard surrounded by residence halls",
      features: ["Seating Areas", "Covered Pavilion", "Near Dining", "Student Housing"],
      hours: "24/7 (Residential Area)",
      capacity: "Medium (30-50 people)",
      image: "/api/placeholder/400/250",
      location: "JP Courtyard, USF Campus",
      coordinates: { lat: 28.0612, lng: -82.4186 },
      rating: 4.3,
      tips: ["Respectful of residents", "Good for evening hangouts", "Covered areas available"],
      contact: "Residential Life: (813) 974-4284"
    },
    {
      id: 5,
      name: "Recreation Center Lobby",
      category: "indoor",
      description: "Modern facility with comfortable seating and high ceilings",
      features: ["Air Conditioning", "Modern Seating", "Near Gym", "Clean Facilities"],
      hours: "5:30 AM - 11:00 PM",
      capacity: "Medium (40-60 people)",
      image: "/api/placeholder/400/250",
      location: "4202 E Fowler Ave, Tampa, FL 33620",
      coordinates: { lat: 28.0595, lng: -82.4175 },
      rating: 4.7,
      tips: ["Busy during peak gym hours", "Great AC during summer", "Water fountains nearby"],
      contact: "(813) 974-2531"
    },
    {
      id: 6,
      name: "The Oval",
      category: "outdoor",
      description: "Large open green space perfect for big group gatherings",
      features: ["Large Open Area", "Event Space", "Parking Nearby", "Scenic Views"],
      hours: "24/7 (Open Space)",
      capacity: "Large (100+ people)",
      image: "/api/placeholder/400/250",
      location: "Central Campus, USF",
      coordinates: { lat: 28.0578, lng: -82.4142 },
      rating: 4.4,
      tips: ["Popular for events", "Bring sun protection", "Check for scheduled events"],
      contact: "Campus Events: (813) 974-4946"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Spots', icon: FaMapMarkerAlt },
    { id: 'indoor', name: 'Indoor', icon: FaBook },
    { id: 'outdoor', name: 'Outdoor', icon: FaGraduationCap },
    { id: 'cafe', name: 'Cafes', icon: FaCoffee }
  ];

  const filteredSpots = selectedCategory === 'all' 
    ? meetupSpots 
    : meetupSpots.filter(spot => spot.category === selectedCategory);

  const handleSpotClick = (spot) => {
    setSelectedSpot(selectedSpot?.id === spot.id ? null : spot);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🐂 USF Campus Meetup Spots
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect spot on campus to meet up with buyers and sellers. 
              Safe, convenient locations across the University of South Florida.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
                }`}
              >
                <category.icon className="text-lg" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FaStar className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-yellow-800 mb-2">Safety First!</h3>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Always meet in public, well-lit areas</li>
                <li>• Bring a friend when possible</li>
                <li>• Let someone know your meetup location and time</li>
                <li>• Trust your instincts - if something feels off, leave</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map(spot => (
            <div 
              key={spot.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 ${
                selectedSpot?.id === spot.id ? 'border-green-500' : 'border-transparent'
              }`}
              onClick={() => handleSpotClick(spot)}
            >
              <div className="relative">
                <img 
                  src={spot.image} 
                  alt={spot.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <div className="bg-white px-2 py-1 rounded-full flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm font-medium">{spot.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {spot.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{spot.name}</h3>
                <p className="text-gray-600 mb-4">{spot.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaClock className="text-green-600" />
                    {spot.hours}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaUsers className="text-green-600" />
                    {spot.capacity}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-green-600" />
                    {spot.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {spot.features.slice(0, 3).map(feature => (
                    <span 
                      key={feature}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                  {spot.features.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                      +{spot.features.length - 3} more
                    </span>
                  )}
                </div>

                <button 
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpotClick(spot);
                  }}
                >
                  {selectedSpot?.id === spot.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View */}
        {selectedSpot && (
          <div className="mt-8 bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedSpot.name}</h2>
                <p className="text-gray-600 mb-6">{selectedSpot.description}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-green-600 text-lg" />
                    <div>
                      <p className="font-medium text-gray-900">Hours</p>
                      <p className="text-gray-600">{selectedSpot.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-green-600 text-lg" />
                    <div>
                      <p className="font-medium text-gray-900">Capacity</p>
                      <p className="text-gray-600">{selectedSpot.capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-green-600 text-lg" />
                    <div>
                      <p className="font-medium text-gray-900">Contact</p>
                      <p className="text-gray-600">{selectedSpot.contact}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Features & Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSpot.features.map(feature => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Pro Tips</h4>
                  <ul className="space-y-2">
                    {selectedSpot.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaStar className="text-yellow-500 text-sm mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-gray-100 rounded-xl p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-6xl text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                    <p className="text-gray-600 mb-4">
                      Lat: {selectedSpot.coordinates.lat}<br />
                      Lng: {selectedSpot.coordinates.lng}
                    </p>
                    <p className="text-sm text-gray-500">
                      Map integration coming soon!<br />
                      For now, use GPS coordinates above
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <FaParking className="text-3xl text-green-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Find Parking</h4>
              <p className="text-sm text-gray-600">Most spots have nearby parking available</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <FaWifi className="text-3xl text-blue-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Free WiFi</h4>
              <p className="text-sm text-gray-600">Connect to USF_STUDENT network</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <FaUsers className="text-3xl text-purple-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Group Meetups</h4>
              <p className="text-sm text-gray-600">Perfect for buying/selling events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMeetup; 