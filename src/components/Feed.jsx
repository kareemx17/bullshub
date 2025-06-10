import Product from './Product'

const Feed = ({products, favoriteProducts, onToggleFavorite}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
            <Product 
              key={product.id} 
              product={product} 
              isFavorite={favoriteProducts?.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
            />
        ))}
    </div>
  )
}

export default Feed