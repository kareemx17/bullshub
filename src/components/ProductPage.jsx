import React from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = ({products}) => {
    const {id} = useParams()
    const product = products.find(p => p.id === id);

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Product not found</div>
    }

    const getImageUrl = (imagePath) => {
        if (imagePath.startsWith('http')) {
            return imagePath;
        } else {
            return `http://localhost:8000/uploads/${imagePath}`;
        }
    }

    const imageUrl = getImageUrl(product.image);

    const handleContactSeller = () => {
        const [contactType, contactValue] = product.contact.split(':');
        if (contactType === 'email') {
            window.location.href = `mailto:${contactValue}`;
        } else if (contactType === 'instagram') {
            window.open(`https://www.instagram.com/${contactValue.slice(1)}`, '_blank');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header Navigation */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Marketplace
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Share this item</span>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image Section */}
                    <div className="space-y-6">
                        <div className="relative bg-white rounded-2xl p-8 shadow-xl overflow-hidden group">
                            <div className="aspect-square overflow-hidden rounded-xl bg-gray-50">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={imageUrl}
                                    alt={product.title}
                                    onError={(e) => {
                                        if (!e.target.src.includes('data:image')) {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=';
                                        }
                                    }}
                                />
                            </div>
                            
                            {/* Floating badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {(product.price.toLowerCase().includes('free') || parseFloat(product.price.replace(/[^0-9.]/g, '')) === 0) && (
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        FREE
                                    </span>
                                )}
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg capitalize">
                                    {product.category}
                                </span>
                            </div>
                        </div>
                        
                        {/* Trust indicators */}
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Tips</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Meet in a public place for exchanges
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Inspect items before purchase
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Use college email for verification
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <p className="text-4xl font-bold text-green-600">
                                    {product.price}
                                </p>
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                    Negotiable
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Seller Info */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {product.contact && product.contact.includes('usf.edu') ? 'USF Student Seller' : 'Local Seller'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {product.contact && product.contact.split(':')[1]}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <button 
                                onClick={handleContactSeller}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg
                                         hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 
                                         shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Contact Seller
                                </div>
                            </button>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-medium
                                                 border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Save
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-medium
                                                 border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L4.168 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
