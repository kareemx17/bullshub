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
        <div className='flex justify-center items-center bg-gray-100 p-4' style={{ minHeight: 'calc(100vh - 64px)' }}>
            <div className='bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full'>
                <div className='flex flex-col md:flex-row'>
                    {/* Product Image Section */}
                    <div className='w-full md:w-2/5 p-4 flex justify-center items-center bg-gray-50'>
                        <img
                            className='w-full h-auto max-h-80 object-contain rounded-lg'
                            src={imageUrl}
                            alt={product.title}
                            onError={(e) => {
                                console.error("Error loading image:", e);
                                e.target.src = '/path/to/fallback/image.jpg'; // Replace with actual fallback image
                            }}
                        />
                    </div>

                    {/* Product Details Section */}
                    <div className='w-full md:w-3/5 p-4 md:p-6 flex flex-col justify-between'>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-800 mb-2'>{product.title}</h1>
                            <p className='text-xl font-semibold text-green-600 mb-2'>{product.price}</p>
                            <p className='text-gray-600 mb-3 text-sm'>{product.description}</p>
                            <p className='text-gray-600 mb-1 text-sm'><span className='font-semibold'>Category:</span> {product.category}</p>
                            <p className='text-gray-600 mb-4 text-sm'><span className='font-semibold'>Contact:</span> {product.contact.split(':')[1]}</p>
                        </div>

                        <button 
                            onClick={handleContactSeller}
                            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md text-sm'
                        >
                            Contact Seller
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
