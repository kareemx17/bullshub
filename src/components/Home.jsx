import React from 'react'
import Feed from './Feed'
import Sidebar from './SideBar'

export const Home = ({products}) => {
  return (
    <div className="flex">
    {/* Sidebar Section */}
    <Sidebar />

    {/* Main Content Section */}
    <main className="flex-grow p-6 bg-gray-100">
      {products.length ? (
        <Feed products={products} />
      ) : (
        <p style={{ marginTop: "2rem" }}>
          No products to display.
        </p>
      )}
    </main>
  </div>
  )
}
