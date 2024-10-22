import React from 'react'
import {Link} from "react-router-dom"

const Product = ({product}) => {
  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) {
      // If it's already a full URL, return it as is
      return imagePath;
    } else {
      // If it's just a filename, prepend the uploads path
      return `http://localhost:8000/uploads/${imagePath}`;
    }
  };

  return (
    <div className="w-56 border-solid border-green-700 border-2 rounded shrink-0">
      <img 
        className="overflow-hidden h-48 w-full object-cover" 
        src={getImageUrl(product.image)} 
        alt={product.title} 
      />
      <div className="pl-2 pb-5">
        <h1 className="font-bold">{product.title}</h1>
        <p className="mb-3">{product.price}</p>
        <Link to={`/product/${product.id}`} className="bg-green-900 text-white rounded p-2 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring focus:ring-green-300">More info</Link>
      </div>
    </div>
  )
}

export default Product
