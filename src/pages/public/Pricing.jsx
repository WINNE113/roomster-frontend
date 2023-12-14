import { apiGetPricings, apiSubcribePricing } from "@/apis/pricing"
import { Button, VerifyPhone } from "@/components"
import { modal } from "@/redux/appSlice"
import { formatMoney } from "@/ultils/fn"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

const PricingItem = ({
  name,
  description,
  price,
  durationDays,
  servicePackageId,
}) => {
  const dispatch = useDispatch()
  const { current } = useSelector((s) => s.user)
  const handleSubcribe = async () => {
    if (current?.phoneNumberConfirmed) {
      const response = await apiSubcribePricing({ servicePackageId })
      if (response.success) {
        toast.success(response.message)
      } else toast.error(response.message)
    } else {
      dispatch(modal({ isShowModal: true, modalContent: <VerifyPhone /> }))
    }
  }
  return (
    <div className="col-span-1 h-full pb-[200px]">
      <h3 className="text-center p-4 border border-emerald-500 bg-emerald-700 text-white font-semibold rounded-t-md">
        {name}
      </h3>
      <div className="flex rounded-b-md border h-[260px] border-emerald-500 flex-col gap-2 justify-between items-center py-3">
        <div className="flex flex-col gap-2 items-center">
          <span>
            <span>Số ngày áp dụng:</span>{" "}
            <span className="text-emerald-700 font-semibold">
              {durationDays + " ngày"}
            </span>
          </span>
          <span>
            <span>Giá:</span>{" "}
            <span className="text-emerald-700 font-semibold">
              {formatMoney(price) + " VNĐ"}
            </span>
          </span>
          <p className="text-sm italic my-3 px-4 line-clamp-5">{description}</p>
        </div>
        <div className="w-full px-4">
          <Button
            onClick={handleSubcribe}
            className="bg-transparent text-emerald-700 border rounded-md border-emerald-700 py-2 w-full"
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  )
}

const Pricing = () => {
  const [pricings, setPricings] = useState([])
  const fetchPricing = async () => {
    const response = await apiGetPricings({ page: 0, limit: 100 })
    if (response.data) setPricings(response.data)
  }
  useEffect(() => {
    fetchPricing()
  }, [])
  return (
    <div className="mx-auto w-main py-8">
      <h1 className="text-2xl font-bold">Bảng giá dịch vụ</h1>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {pricings?.map((el) => (
          <PricingItem key={el.servicePackageId} {...el} />
        ))}
      </div>
    </div>
  )
}

export default Pricing
