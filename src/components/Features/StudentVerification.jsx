import { useState, useEffect } from 'react'
import { FaShieldAlt, FaCheckCircle, FaExclamationTriangle, FaUpload, FaIdCard } from 'react-icons/fa'
import { useAuth } from '../Auth/AuthContext'

const StudentVerification = () => {
  const { user } = useAuth()
  const [verificationStatus, setVerificationStatus] = useState('unverified')
  const [verificationData, setVerificationData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    graduationYear: '',
    major: ''
  })
  const [uploadedDocument, setUploadedDocument] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const majors = [
    'Computer Science', 'Engineering', 'Business', 'Medicine', 'Nursing',
    'Psychology', 'Biology', 'Chemistry', 'Physics', 'Mathematics',
    'English', 'History', 'Art', 'Music', 'Education', 'Other'
  ]

  // Sample verification status
  useEffect(() => {
    if (user) {
      // Simulate different verification statuses
      const statuses = ['unverified', 'pending', 'verified', 'rejected']
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      setVerificationStatus(randomStatus)
      
      if (randomStatus === 'verified') {
        setVerificationData({
          studentId: 'U12345678',
          fullName: user.username || 'Student Name',
          email: 'student@usf.edu',
          graduationYear: '2025',
          major: 'Computer Science'
        })
      }
    }
  }, [user])

  const handleSubmitVerification = (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign in to submit verification')
      return
    }

    if (!uploadedDocument) {
      alert('Please upload a verification document')
      return
    }

    setVerificationStatus('pending')
    setShowForm(false)
    // In real app, this would submit to backend
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedDocument(file)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'verified': return <FaCheckCircle className="text-green-500" />
      case 'pending': return <FaExclamationTriangle className="text-yellow-500" />
      case 'rejected': return <FaExclamationTriangle className="text-red-500" />
      default: return <FaShieldAlt className="text-gray-400" />
    }
  }

  const getStatusMessage = (status) => {
    switch(status) {
      case 'verified':
        return {
          title: 'Verification Complete! ✅',
          message: 'Your USF student status has been verified. You now have access to verified student features and trusted transaction badges.',
          action: null
        }
      case 'pending':
        return {
          title: 'Verification in Progress ⏳',
          message: 'Your verification documents are being reviewed. This typically takes 1-3 business days. We&apos;ll notify you once the review is complete.',
          action: null
        }
      case 'rejected':
        return {
          title: 'Verification Requires Attention ⚠️',
          message: 'Your verification could not be completed. Please check your documents and try again, or contact support for assistance.',
          action: 'Resubmit Documents'
        }
      default:
        return {
          title: 'Verify Your USF Student Status 🎓',
          message: 'Get verified to access exclusive features, build trust with other students, and unlock special benefits.',
          action: 'Start Verification'
        }
    }
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 text-center py-12">
          <FaShieldAlt className="mx-auto text-4xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">USF Student Verification</h2>
          <p className="text-gray-600 mb-6">
            Get verified USF student badges for trusted transactions within the campus community
          </p>
          <p className="text-gray-500">Please sign in to start the verification process</p>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusMessage(verificationStatus)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">USF Student Verification</h1>
              <p className="text-gray-600">Verify your student status for trusted transactions</p>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              {getStatusIcon(verificationStatus)}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{statusInfo.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(verificationStatus)}`}>
                  {verificationStatus.charAt(0).toUpperCase() + verificationStatus.slice(1)}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{statusInfo.message}</p>
            
            {statusInfo.action && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                {statusInfo.action}
              </button>
            )}
          </div>

          {/* Verified Student Information */}
          {verificationStatus === 'verified' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Verified Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700">Student ID</label>
                  <p className="text-green-900 font-mono">{verificationData.studentId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700">Full Name</label>
                  <p className="text-green-900">{verificationData.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700">USF Email</label>
                  <p className="text-green-900">{verificationData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700">Expected Graduation</label>
                  <p className="text-green-900">{verificationData.graduationYear}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700">Major</label>
                  <p className="text-green-900">{verificationData.major}</p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits of Verification */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits of Student Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Trusted Badge</h4>
                  <p className="text-sm text-gray-600">Display verified student badge on your profile and listings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Priority Support</h4>
                  <p className="text-sm text-gray-600">Get faster response times from customer support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Exclusive Features</h4>
                  <p className="text-sm text-gray-600">Access to verified-only study groups and events</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Reduced Fees</h4>
                  <p className="text-sm text-gray-600">Lower transaction fees for verified students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Form */}
        {(showForm || verificationStatus === 'unverified') && (
          <div className="p-6 bg-gray-50">
            <h3 className="text-xl font-semibold mb-4">Student Verification Form</h3>
            <form onSubmit={handleSubmitVerification} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="USF Student ID (U12345678)"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={verificationData.studentId}
                  onChange={(e) => setVerificationData({...verificationData, studentId: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Full Name (as on student ID)"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={verificationData.fullName}
                  onChange={(e) => setVerificationData({...verificationData, fullName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="USF Email Address"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={verificationData.email}
                  onChange={(e) => setVerificationData({...verificationData, email: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Expected Graduation Year"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={verificationData.graduationYear}
                  onChange={(e) => setVerificationData({...verificationData, graduationYear: e.target.value})}
                />
              </div>

              <select
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={verificationData.major}
                onChange={(e) => setVerificationData({...verificationData, major: e.target.value})}
              >
                <option value="">Select Your Major</option>
                {majors.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>

              {/* Document Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FaUpload className="mx-auto text-3xl text-gray-400 mb-3" />
                <h4 className="font-medium text-gray-900 mb-2">Upload Verification Document</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a clear photo of your USF student ID, enrollment letter, or transcript
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Choose File
                </label>
                {uploadedDocument && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {uploadedDocument.name} uploaded
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Submit Verification
                </button>
                {showForm && (
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Security Information */}
        <div className="p-6 bg-blue-50 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <FaIdCard className="text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Your Privacy & Security</h3>
              <p className="text-blue-800 text-sm">
                We take your privacy seriously. Your verification documents are encrypted and only used to confirm your student status. 
                Personal information is never shared with other users without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentVerification 