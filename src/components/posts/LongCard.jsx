import path from '@/ultils/path'
import React from 'react'
import { Link } from 'react-router-dom'

const LongCard = () => {
    return (
        <div className='w-full grid grid-cols-10 rounded-md border'>
            <img
                src="https://tromoi.com/uploads/guest/o_1hbcqempr47h162mf1o15h1jdig.jpeg"
                alt="avatar"
                className='w-full col-span-2 h-[156px] object-cover rounded-tl-md rounded-bl-md'
            />
            <div className='p-3 col-span-8 flex flex-col gap-1'>
                <span className='text-sm text-gray-500'>Hồ Chí Minh</span>
                <Link
                    className='text-emerald-800 cursor-pointer hover:underline font-semibold line-clamp-2'
                    to={`/${path.DETAIL_POST}/pid/Với 5tr/tháng có ngay CHDV ngay trung tâm Bàu Cát, sầm uất nhất Tân Bình`}
                >
                    Với 5tr/tháng có ngay CHDV ngay trung tâm Bàu Cát, sầm uất nhất Tân Bình
                </Link>
                <span className='text-sm text-gray-500'>Bàu Cát, 14, Tân Bình , Tân Bình</span>
                <div className='mt-3 flex justify-between items-center'>
                    <span className='font-medium text-main-orange'>5.000.000 VNĐ</span>
                    <span className='text-gray-500 text-sm'>Hôm nay</span>
                </div>
            </div>
        </div>
    )
}

export default LongCard