import React from 'react'
import { Button } from '..'
import { menu } from '@/ultils/constant'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import withBaseTopping from '@/hocs/withBaseTopping'
import path from '@/ultils/path'


const Header = ({ navigate }) => {
    return (
        <div className='w-main fixed top-0 left-0 right-0 mx-auto flex gap-6 items-center justify-between h-[100px]'>
            <div className='flex items-center gap-6'>
                <div className='h-[90px] p-2'>
                    <img src="/logo.svg" alt="logo" className='h-full object-contain' />
                </div>
                <div className='flex items-center'>
                    {menu.map(el => (
                        <div key={el.id} className='relative w-fit'>
                            <NavLink
                                className={({ isActive }) => clsx('font-semibold py-2 px-4 border border-transparent text-sm hover:bg-[#2B82FF26] hover:animate-scale-up-center absolute text-transparent inset-0 hover:border-gray-900 hover:text-transparent hover:rounded-l-full hover:rounded-r-full')}
                            >
                                {el.name}
                            </NavLink>
                            <div className='py-2 font-semibold w-fit h-full px-4'>{el.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex gap-3 items-center'>
                <Button
                    onClick={() => navigate(`${path.LOGIN}`, { state: { mode: 'REGISTER' } })}
                    bgColor='transparent'
                    textColor='text-black'
                >
                    ĐĂNG KÝ
                </Button>
                <Button
                    onClick={() => navigate(`${path.LOGIN}`, { state: { mode: 'LOGIN' } })}
                    bgColor='transparent'
                    textColor='text-black'

                >ĐĂNG NHẬP
                </Button>
                <Button bgColor='bg-gradient-to-r from-[#0045a8] to-[#2cd7ff]'>ĐĂNG TIN</Button>
            </div>
        </div>
    )
}

export default withBaseTopping(Header)