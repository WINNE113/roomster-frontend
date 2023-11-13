import { customMoney, renderStarFromNumber } from '@/ultils/fn'
import clsx from 'clsx'
import React, { useState } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { BsPhoneVibrate } from 'react-icons/bs'

const DetailPost = () => {
    const [seeMore, setSeeMore] = useState(false)
    return (
        <div className='w-main mt-6 m-auto pb-10'>
            <div className='grid grid-cols-4 h-[410px] relative grid-rows-2 gap-3'>
                <img src="https://tromoi.com/uploads/guest/o_1hbcqempr47h162mf1o15h1jdig.jpeg" alt="avatar" className='col-span-2 w-full h-full row-span-2 object-cover rounded-l-md' />
                <img src="https://tromoi.com/uploads/guest/o_1hbcqempr47h162mf1o15h1jdig.jpeg" alt="avatar" className='col-span-1 w-full h-full row-span-1 object-cover' />
                <img src="https://tromoi.com/uploads/guest/o_1hbcqempr47h162mf1o15h1jdig.jpeg" alt="avatar" className='col-span-1 w-full h-full row-span-1 object-cover rounded-tr-md' />
                <img src="https://tromoi.com/uploads/guest/o_1hbcqempr47h162mf1o15h1jdig.jpeg" alt="avatar" className='col-span-1 w-full h-full row-span-1 object-cover' />
                <img src="https://tromoi.com/uploads/guest/o_1hbcqempr47h162mf1o15h1jdig.jpeg" alt="avatar" className='col-span-1 w-full h-full row-span-1 object-cover rounded-br-md' />
                <div className='absolute bottom-6 right-8 bg-white borer-2 rounded-md border-emerald-800 gap-2 flex items-center justify-center px-4 py-2'>
                    <AiOutlineUnorderedList />
                    <span className='text-emerald-800 font-medium'>Hiện thị tất cả ảnh</span>
                </div>
            </div>
            <div className='grid grid-cols-10 gap-4 mt-6'>
                <div className='col-span-7 flex flex-col gap-3'>
                    <h1 className='text-xl flex items-center gap-3 text-emerald-700 font-bold line-clamp-2'>
                        <span className='flex items-center'>
                            {renderStarFromNumber(4)?.map((el, idx) => <span key={idx}>{el}</span>)}</span>
                        <span>Với 5tr/tháng có ngay CHDV ngay trung tâm Bàu Cát, sầm uất nhất Tân Bình</span>
                    </h1>
                    <span>Chuyên mục: <span className='text-main-orange font-semibold underline cursor-pointer'>Cho thuê phòng trọ Hồ Chí Minh</span></span>
                    <span className='flex items-center gap-2'>
                        <GoLocation color='#1266DD' size={16} />
                        <span>Bàu Cát, 14, Tân Bình , Tân Bình</span>
                    </span>
                    <div className='grid grid-cols-3'>
                        <span className='flex items-center gap-2'>💰<span className='text-lg font-bold text-green-600'>{customMoney(125000000)}</span></span>
                        <span className='flex items-center gap-2'>🔳<span>25</span><span>m<sup>2</sup></span></span>
                        <span className='flex items-center gap-2'>🕓<span>5 ngày trước</span></span>
                    </div>
                    <div className='mt-6'>
                        <h2 className='text-lg my-3 font-bold'>Đặc điểm tin đăng</h2>
                        <div className='grid grid-cols-10'>
                            <div className='col-span-3 flex flex-col'>
                                <span className='p-2  border-[0.5px]'>Khu vực:</span>
                                <span className='p-2  border-[0.5px] bg-gray-100'>Loại tin rao:</span>
                                <span className='p-2  border-[0.5px]'>Đối tượng:</span>
                                <span className='p-2  border-[0.5px] bg-gray-100'>Ngày đăng:</span>
                            </div>
                            <div className='col-span-7 flex flex-col'>
                                <span className='p-2  border-[0.5px]'>Cho thuê phòng trọ Hồ Chí Minh</span>
                                <span className='p-2  border-[0.5px] bg-gray-100'>Cho thuê phòng trọ</span>
                                <span className='p-2  border-[0.5px]'>Tất cả</span>
                                <span className='p-2  border-[0.5px] bg-gray-100'>12/11/2023</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <h2 className='text-lg font-bold my-3'>Thông tin liên hệ</h2>
                        <div className='grid grid-cols-10'>
                            <div className='col-span-3 flex flex-col'>
                                <span className='p-2  border-[0.5px]'>Liên hệ:</span>
                                <span className='p-2  border-[0.5px] bg-gray-100'>Điện thoại:</span>
                                <span className='p-2  border-[0.5px]'>Zalo:</span>
                            </div>
                            <div className='col-span-7 flex flex-col'>
                                <span className='p-2  border-[0.5px]'>Nguyên Văn A</span>
                                <span className='p-2  border-[0.5px] bg-gray-100'>0124578963</span>
                                <span className='p-2  border-[0.5px]'>0124578963</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <h2 className='text-lg font-bold my-3'>Thông tin chi tiết</h2>
                        <p className={clsx(!seeMore && 'line-clamp-4')}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
                            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
                            fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
                            consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                            doloremque. Quaerat provident commodi consectetur veniam similique ad
                            earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
                            fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
                            suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                            modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
                            totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
                            quasi aliquam eligendi, placeat qui corporis!
                        </p>
                        <span className='text-emerald-500 hover:underline cursor-pointer' onClick={() => setSeeMore(!seeMore)}>Xem chi tiết</span>
                    </div>
                    <div className='mt-6'>
                        <h2 className='text-lg font-bold my-3'>Bản đồ</h2>
                        <span>Địa chỉ: Bàu Cát, 14, Tân Bình , Tân Bình</span>
                        <div className='h-[250px] bg-gray-100 rounded-md'>
                            MAP HERE
                        </div>
                    </div>
                </div>
                <div className='col-span-3'>
                    <div className='w-full flex flex-col gap-2 items-center justify-center rounded-md bg-emerald-800 text-white p-4'>
                        <img src="/user.svg" alt="user" className='rounded-full w-24 h-24 object-cover border border-main-yellow' />
                        <span className='text-lg font-medium text-main-orange'>Nguyễn Văn A</span>
                        <a className='text-white flex items-center justify-center gap-2 px-4 py-2 border w-3/5 text-center border-white rounded-md' href="tel:+84132456456">
                            <span className='text-white text-2xl'><BsPhoneVibrate /></span>
                            <span>0134645645</span>
                        </a>
                        <a className='text-emerald-800 font-medium flex items-center bg-main-orange justify-center gap-2 px-4 py-2 border w-3/5 text-center border-main-orange rounded-md' href="https://zalo.me/0132456456">
                            <img src="/zalo.svg" alt="zaol" className='w-6 h-6 object-cover' />
                            <span>0134645645</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPost