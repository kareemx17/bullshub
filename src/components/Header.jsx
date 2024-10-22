// import React from 'react'
import {Link} from "react-router-dom"

const Header = ({search, setSearch}) => {
  return (

    <header className="bg-green-900 p-4">
    <div className="container mx-auto flex flex-wrap items-center justify-between">
    
      <div className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
        <Link to={'/'} className="text-white text-2xl font-bold">Bulls Buy</Link>
      </div>
      <div className="flex-grow w-full sm:max-w-md sm:mx-4 mb-2 sm:mb-0">
        <form onSubmit={(e) => e.preventDefault()}>
                <input
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id='search'
                    type='text'
                    role='searchbox'
                    placeholder='Search a product...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
        </form>
      </div>
      <div className="w-full sm:w-auto flex justify-center sm:justify-end space-x-4">
        <Link to='/sell' className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex-shrink-0'>Sell</Link>
        <Link to='/signin' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-shrink-0'>Sign in</Link>
        {/* <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-shrink-0">Sign in</button> */}
      </div>
    </div>
  </header>

  )
}

export default Header
