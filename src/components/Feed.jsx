import React from 'react'
import Product from './Product'

const Feed = ({products}) => {
  return (
    <ul className="flex gap-10 flex-wrap">
        {products.map(product => (
            <Product key={product.id} product={product} />
        ))}

    </ul>
  )
}

export default Feed