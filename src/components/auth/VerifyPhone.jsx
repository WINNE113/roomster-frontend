import React, { useEffect } from "react"
import { Button, InputForm, OtpVerify } from ".."
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { apiVerifyRole } from "@/apis/user"
import WithBaseTopping from "@/hocs/WithBaseTopping"
import { modal } from "@/redux/appSlice"

const VerifyPhone = ({ dispatch }) => {
  const { current } = useSelector((s) => s.user)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm()
  useEffect(() => {
    if (current && current?.phoneNumber) {
      reset({ phoneNumber: current.phoneNumber })
    }
  }, [current])
  const handleSendOtp = async () => {
    setIsLoading(true)
    const response = await apiVerifyRole({
      phoneNumber: watch("phoneNumber"),
      userName: current?.userName,
    })
    setIsLoading(false)
    dispatch(modal({ isShowModal: true, modalContent: <OtpVerify /> }))

    console.log(response)
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[500px] bg-white p-4 rounded-md"
    >
      <h3 className="border-b pb-2 text-lg font-bold">Xác minh SĐT:</h3>
      <InputForm
        register={register}
        errors={errors}
        id="phoneNumber"
        placeholder="Nhập SĐT của bạn"
        wrapClassanme="mt-4"
      />
      <Button
        disabled={isLoading}
        onClick={handleSendOtp}
        className="mt-4 mx-auto"
      >
        Gửi OTP
      </Button>
    </div>
  )
}

export default WithBaseTopping(VerifyPhone)