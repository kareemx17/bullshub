import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
            <h2>Page Not Found</h2>
            <p>Well, that&apos;s disappointing.</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
        </main>
  )
}

export default Missing