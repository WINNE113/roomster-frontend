import React from "react"
import { Button, InputForm } from ".."
import { useForm } from "react-hook-form"
import { modal } from "@/redux/appSlice"
import WithBaseTopping from "@/hocs/WithBaseTopping"

const Report = ({ dispatch }) => {
  const {
    register,
    formState: { errors },
  } = useForm()
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-md w-[500px]"
    >
      <h1 className="p-4 border-b text-2xl text-center font-semibold">
        Vui lòng điền thông tin
      </h1>
      <div className="p-4 flex flex-col gap-6">
        <textarea
          placeholder="Bạn hãy mô tả thêm thông tin"
          id=""
          rows="5"
          className="form-textarea w-full"
        ></textarea>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">
            Điền thông tin để Trọ Uy Tín liên lạc với bạn khi cần thiết
          </h3>
          <InputForm
            register={register}
            id="email"
            errors={errors}
            placeholder="Email"
          />
          <InputForm
            register={register}
            id="phoneNumber"
            errors={errors}
            placeholder="Phone number"
          />
        </div>
        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() =>
              dispatch(modal({ isShowModal: false, modalContent: null }))
            }
            className="bg-red-700"
          >
            Hủy
          </Button>
          <Button>Gửi báo cáo</Button>
        </div>
      </div>
    </div>
  )
}

export default WithBaseTopping(Report)