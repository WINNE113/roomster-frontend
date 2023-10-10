import React from 'react'

const Banner = () => {
    return (
        <section className='relative h-[500px] w-full'>
            <img src="/bg_head.jpg" alt="bg" className='h-full w-full object-cover' />
            <div className='absolute inset-0 bg-overlay-20'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-main grid grid-cols-2'>
                    <div className='w-full col-span-1'>
                        <h1 className='text-[50px] font-bold text-white flex flex-col'>
                            <span>TÌM NHANH, KIẾM DỄ</span>
                            <span>TRỌ MỚI TOÀN QUỐC</span>
                        </h1>
                        <span className='line-clamp-2 w-full mt-6 text-white'>Tromoi.com - Trang thông tin tìm và cho thuê phòng trọ nhanh chóng, hiệu quả số với hơn 500 tin đăng mới và 30.000 lượt xem mỗi ngày.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner