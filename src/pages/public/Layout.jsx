import { Header } from '@/components'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <div className='w-full h-[100px]'></div>
            <Header />
            <div className='w-full'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout