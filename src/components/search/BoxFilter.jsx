import React from 'react'

const BoxFilter = ({ children, title }) => {
    return (
        <div className='rounded-md text-sm bg-gray-100'>
            <h2 className='text-white rounded-tl-md rounded-tr-md font-bold bg-emerald-700 p-3'>{title}</h2>
            {children}
        </div>
    )
}

export default BoxFilter