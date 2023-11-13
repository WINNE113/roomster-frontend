import { apiGetProvince } from '@/apis/app'
import { BoxFilter, Button, LongCard, SelectLib } from '@/components'
import { areaOptions, distances, priceOptions, targets } from '@/ultils/constant'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const Filter = () => {
    const { provinces } = useSelector(s => s.app)
    const { setValue, watch, reset } = useForm()
    const [provinceDetail, setProvinceDetail] = useState(null)
    const setCustomValue = (id, val) => setValue(id, val, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
    const getprovince = async (code) => {
        const response = await apiGetProvince(code)
        if (response.status === 200) setProvinceDetail(response.data)
    }
    const province = watch('province')
    const target = watch('target')
    const district = watch('district')
    const ward = watch('ward')
    const distance = watch('distance')
    useEffect(() => {
        if (province?.code) getprovince(province.code)
    }, [province?.code])
    const resetValue = () => {
        setCustomValue('province', '')
        setCustomValue('district', '')
        setCustomValue('ward', '')
        setCustomValue('distance', '')
    }
    // console.log(provinceDetail)
    return (
        <section className='w-main mx-auto my-6 grid grid-cols-12 gap-4'>
            <div className='col-span-9 flex flex-col'>
                <div className='w-full flex justify-between items-center pb-4 border-b'>
                    <span>Kết quả: 113 bài đăng</span>
                    <div>
                        <span>Hiển thị:</span>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-2 mt-4'>
                    <LongCard />
                    <LongCard />
                    <LongCard />
                    <LongCard />
                    <LongCard />
                </div>
            </div>
            <div className='flex flex-col gap-4 col-span-3'>
                <BoxFilter title='ĐỊA ĐIỂM, VỊ TRÍ'>
                    <div className='p-2 flex flex-col gap-2'>
                        <SelectLib
                            className='col-span-2 text-sm'
                            onChange={val => setCustomValue('province', val)}
                            value={province}
                            options={provinces?.map(el => ({ ...el, value: el.code, label: el.name }))}
                            placeholder='Tỉnh / Thành phố'
                        />
                        <SelectLib
                            className='col-span-2 text-sm'
                            onChange={val => setCustomValue('district', val)}
                            value={district}
                            options={provinceDetail?.districts?.map(el => ({ ...el, value: el.code, label: el.name }))}
                            placeholder='Quận / Huyện'
                            disabled={!provinceDetail?.districts}
                        />
                        <SelectLib
                            className='col-span-2 text-sm'
                            onChange={val => setCustomValue('ward', val)}
                            value={ward}
                            options={provinceDetail?.districts?.find(el => el.codename === district?.codename)?.wards?.map(el => ({ ...el, value: el.code, label: el.name }))}
                            placeholder='Phường / Xã'
                            disabled={!district?.codename}
                        />
                        <SelectLib
                            className='col-span-2 text-sm'
                            onChange={val => setCustomValue('distance', val)}
                            value={distance}
                            options={distances}
                            placeholder='Khoảng cách'
                            disabled={!ward}
                        />
                        <div className='w-full flex gap-3 justify-end items-center'>
                            <Button className='py-1 bg-transparent border border-emerald-600 text-emerald-600'>Thêm</Button>
                            <Button onClick={resetValue} className='py-1 bg-transparent border border-orange-600 text-orange-600'>Reset</Button>
                        </div>
                    </div>
                </BoxFilter>
                <BoxFilter title='GIÁ THUÊ'>
                    <div className='grid grid-cols-2 gap-2 p-2'>
                        {priceOptions.map((el, idx) => (
                            <div className='flex items-center gap-2' key={idx}>
                                <input type="radio" name={el.type} id={idx} />
                                <label htmlFor={idx}>{el.value}</label>
                            </div>
                        ))}
                    </div>
                </BoxFilter>
                <BoxFilter title='DIỆN TÍCH'>
                    <div className='grid grid-cols-2 gap-2 p-2'>
                        {areaOptions.map((el, idx) => (
                            <div className='flex items-center gap-2' key={idx}>
                                <input type="radio" name={el.type} id={idx} />
                                <label htmlFor={idx}>{el.value}</label>
                            </div>
                        ))}
                    </div>
                </BoxFilter>
                <BoxFilter title='KHÁC'>
                    <div className='flex flex-col gap-2 p-2'>
                        <SelectLib
                            className='text-sm'
                            onChange={val => setCustomValue('target', val)}
                            value={target}
                            options={targets}
                            placeholder='Đối tượng'
                        />
                        Other
                    </div>
                </BoxFilter>
            </div>

        </section>
    )
}

export default Filter