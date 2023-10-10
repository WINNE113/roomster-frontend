import React from 'react'

const Card = () => {
    return (
        <div className='w-full col-span-1 flex flex-col rounded-md border'>
            <img
                src="https://tromoi.com/uploads/guest/o_1hbcqempr47h162mf1o15h1jdig.jpeg"
                alt="avatar"
                className='w-full h-[156px] object-cover rounded-tl-md rounded-tr-md'
            />
            <div className='p-3 flex flex-col gap-1'>
                <span className='text-sm text-gray-500'>Hồ Chí Minh</span>
                <h3 className='text-main font-semibold line-clamp-2'>Với 5tr/tháng có ngay CHDV ngay trung tâm Bàu Cát, sầm uất nhất Tân Bình</h3>
                <span className='text-sm text-gray-500'>Bàu Cát, 14, Tân Bình , Tân Bình</span>
                <div className='mt-3 flex justify-between items-center'>
                    <span className='font-medium'>5.000.000 VNĐ</span>
                    <span className='text-gray-500 text-sm'>Hôm nay</span>
                </div>
            </div>
        </div>
    )
}

export default Card