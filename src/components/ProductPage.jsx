import React from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = ({products}) => {
    const {id} = useParams()
    const product = products.find(p => p.id === id);

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Product not found</div>
    }

    const getImageUrl = (imagePath) => {
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        } else {
            const cleanPath = imagePath.startsWith('uploads/') ? imagePath.slice(8) : imagePath;
            return `http://localhost:8000/uploads/${cleanPath}`;
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
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8'>
            <div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]'>
                <div className='flex flex-col md:flex-row'>
                    {/* Product Image Section */}
                    <div className='w-full md:w-1/2 p-6 md:p-8 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100'>
                        <div className='relative group w-full aspect-square md:aspect-auto md:h-[500px] overflow-hidden rounded-xl'>
                            <img
                                className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-105'
                                src={imageUrl}
                                alt={product.title}
                                onError={(e) => {
                                    console.error("Error loading image:", e);
                                    e.target.src = '/placeholder.jpg';
                                }}
                            />
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className='w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between'>
                        <div className='space-y-8'>
                            {/* Category & Title Group */}
                            <div className='space-y-3'>
                                <div className='inline-block'>
                                    <span className='text-sm font-medium text-blue-600 tracking-wider uppercase 
                                                   bg-blue-50 px-3 py-1 rounded-full'>
                                        {product.category}
                                    </span>
                                </div>
                                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 tracking-tight 
                                              leading-tight'>
                                    {product.title}
                                </h1>
                                <p className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 
                                             to-emerald-500 bg-clip-text text-transparent'>
                                    {product.price}
                                </p>
                            </div>

                            {/* Description */}
                            <div className='prose prose-lg max-w-none'>
                                <p className='text-gray-600 leading-relaxed border-l-4 border-blue-100 
                                             pl-4 py-2 bg-gradient-to-r from-blue-50/50 to-transparent'>
                                    {product.description}
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className='flex items-center space-x-3 p-4 bg-gray-50 rounded-xl 
                                           border border-gray-100'>
                                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' 
                                     viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} 
                                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' 
                                    />
                                </svg>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-500'>Contact</span>
                                    <span className='font-medium text-gray-900'>{product.contact.split(':')[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Button */}
                        <div className='mt-8'>
                            <button 
                                onClick={handleContactSeller}
                                className='w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                                         px-6 py-3.5 rounded-xl font-medium tracking-wide transition-all 
                                         duration-300 hover:from-blue-700 hover:to-blue-800 
                                         hover:shadow-lg hover:-translate-y-0.5 focus:outline-none 
                                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            >
                                Contact Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
