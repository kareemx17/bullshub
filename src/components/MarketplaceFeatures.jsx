import { FaBookOpen, FaUserFriends, FaCalendarAlt, FaBell, FaShieldAlt, FaStar, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const MarketplaceFeatures = () => {
  const features = [
    {
      icon: FaBookOpen,
      title: "Textbook Exchange Program",
      description: "Trade textbooks with other students for future semesters. Build a network of book exchanges.",
      color: "bg-blue-500",
      comingSoon: false
    },
    {
      icon: FaUserFriends,
      title: "Study Buddy Finder",
      description: "Find study partners when buying course materials. Connect with classmates taking the same courses.",
      color: "bg-purple-500",
      comingSoon: false
    },
    {
      icon: FaCalendarAlt,
      title: "Semester Alerts",
      description: "Get notified when items you need become available before each semester starts.",
      color: "bg-green-500",
      comingSoon: false
    },
    {
      icon: FaBell,
      title: "Course-Based Notifications",
      description: "Subscribe to course codes (like EGN 3000) to get alerts when related items are posted.",
      color: "bg-yellow-500",
      comingSoon: false
    },
    {
      icon: FaShieldAlt,
      title: "USF Student Verification",
      description: "Verified USF student badges for trusted transactions within the campus community.",
      color: "bg-red-500",
      comingSoon: false
    },
    {
      icon: FaStar,
      title: "Seller Ratings",
      description: "Rate and review other students to build a trusted marketplace community.",
      color: "bg-indigo-500",
      comingSoon: false
    },
    {
      icon: FaGraduationCap,
      title: "Graduation Sale Events",
      description: "Special events where graduating students sell all their materials at discounted prices.",
      color: "bg-pink-500",
      comingSoon: true
    },
    {
      icon: FaMapMarkerAlt,
      title: "Campus Meetup Spots",
      description: "Suggested safe meetup locations on campus for item exchanges.",
      color: "bg-teal-500",
      comingSoon: false
    }
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎓 College-Focused Features
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We&apos;re building the ultimate marketplace designed specifically for college students&apos; needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          
          // Define routes for each feature
          const getFeatureRoute = (title) => {
            switch(title) {
              case "Textbook Exchange Program": return "/features/textbook-exchange"
              case "Study Buddy Finder": return "/features/study-buddy"
              case "Semester Alerts": return "/features/semester-alerts"
              case "Course-Based Notifications": return "/features/course-notifications"
              case "USF Student Verification": return "/features/student-verification"
              case "Seller Ratings": return "/features/seller-ratings"
              case "Campus Meetup Spots": return "/meetup"
              default: return null
            }
          }
          
          const route = getFeatureRoute(feature.title)
          const isClickable = route !== null
          
          const cardContent = (
            <div 
              className={`relative p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 group hover:shadow-lg ${
                feature.comingSoon ? 'opacity-75' : ''
              } ${isClickable && !feature.comingSoon ? 'cursor-pointer hover:border-blue-400' : ''}`}
            >
              {feature.comingSoon && (
                <div className="absolute top-2 right-2">
                  <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Coming Soon
                  </span>
                </div>
              )}
              
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent className="text-white text-xl" />
              </div>
              
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {isClickable && !feature.comingSoon && (
                <div className="mt-3 text-blue-600 text-sm font-medium">
                  Click to explore →
                </div>
              )}
            </div>
          );

          return (isClickable && !feature.comingSoon) ? (
            <Link key={index} to={route}>
              {cardContent}
            </Link>
          ) : (
            <div key={index}>
              {cardContent}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            🚀 Help us prioritize!
          </h3>
          <p className="text-gray-600 mb-4">
            Which feature would you like to see first? Your feedback helps us build what students need most.
          </p>
          <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFeatures; 