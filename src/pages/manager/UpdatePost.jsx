import {
  Button,
  Convenient,
  InputForm,
  Map,
  SelectLib,
  TextField,
} from "@/components"
import { targets } from "@/ultils/constant"
import { getBase64 } from "@/ultils/fn"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ImBin } from "react-icons/im"
import { useSelector } from "react-redux"

const UpdatePost = ({ editPost }) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    formState: { errors },
    watch,
    register,
    getValues,
    reset,
    setValue,
    handleSubmit: validate,
  } = useForm()
  const { provinces } = useSelector((state) => state.app)
  const [postTypes, setPostTypes] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [imagesBase64, setImagesBase64] = useState([])
  const [imageHover, setImageHover] = useState()
  const province = watch("province")
  const district = watch("district")
  const ward = watch("ward")
  const post_type = watch("post_type")
  const images = watch("images")
  const address = watch("address")
  const street = watch("street")
  const object = watch("object")
  const description = watch("description")
  const convenient = watch("convenient")
  useEffect(() => {
    setImagesBase64([])
    if (images && images instanceof FileList)
      for (let file of images) convertFileToBase64(file)
  }, [images])
  useEffect(() => {
    if (province) {
      getDataProvince(province.code)
    }
    setValue("district", "")
    setValue("ward", "")
    setValue("street", "")
    setDistricts([])
    setWards([])
  }, [province])
  useEffect(() => {
    if (district) setWards(district.wards)
  }, [district])
  useEffect(() => {
    setValue("address", editPost?.address)
    setValue("category", editPost?.category)
    setValue("title", editPost?.title)
    setValue("description", editPost?.description)
    setValue("price", editPost?.price)
    setValue("area", editPost?.area)
    setValue("target", editPost?.target)
    setValue("images", editPost?.images)
    setValue("isAvailable", editPost?.isAvailable ? 1 : 0)
  }, [editPost])
  const handleSubmit = async () => {
    // const payload = { title, category: category?.id, price, area, images, target: target?.name, description, postedBy: current?.id, address, isAvailable }
    // setIsLoading(true)
    // const response = await apiUpdatePost(payload, editPost.id)
    // setIsLoading(false)
    // if (response.success) {
    //     render&& render()
    //     toast.success(response.mes)
    //     dispatch(modal({ isShowModal: false, modalContent: null }))
    // } else toast.error(response.mes)
  }
  const convertFileToBase64 = async (file) => {
    const base64 = await getBase64(file)
    if (base64) setImagesBase64((prev) => [...prev, base64])
  }
  const removeFileFromFileList = (index, filesId) => {
    const dt = new DataTransfer()
    const input = document.getElementById(filesId)
    const { files } = input

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (index !== i) dt.items.add(file) // here you exclude the file. thus removing it.
    }
    setValue("images", dt.files)
    // input.files = dt.files
  }
  console.log(editPost)
  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className="w-4/5 mx-auto max-h-screen overflow-y-auto relative bg-white p-4"
    >
      <div className="p-4 flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold tracking-tight">{`Cập nhật tin đăng #${editPost?.id}`}</h1>
        <div className="flex items-center gap-4">
          <Button onClick={handleSubmit} disabled={isLoading}>
            Cập nhật
          </Button>
          <Button className="bg-main-yellow">Cancel</Button>
        </div>
      </div>
      <form className="p-4 grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <h1 className="text-lg font-semibold  text-main-blue">
            1. Địa chỉ cho thuê
          </h1>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <SelectLib
              options={provinces?.map((el) => ({
                ...el,
                value: el.code,
                label: el.name,
              }))}
              onChange={(val) => setValue("province", val)}
              value={province}
              className="col-span-1"
              label="Tỉnh/Thành phố"
              id="province"
              register={register}
              errors={errors}
            />
            <SelectLib
              options={districts?.map((el) => ({
                ...el,
                value: el.code,
                label: el.name,
              }))}
              onChange={(val) => setValue("district", val)}
              value={district}
              className="col-span-1"
              label="Quận/Huyện"
              id="district"
              register={register}
              errors={errors}
            />
            <SelectLib
              options={wards?.map((el) => ({
                ...el,
                value: el.code,
                label: el.name,
              }))}
              onChange={(val) => setValue("ward", val)}
              value={ward}
              className="col-span-1"
              label="Phường/Xã"
              id="ward"
              register={register}
              errors={errors}
            />
          </div>
          <div className="mt-4">
            <InputForm
              label="Đường/Phố/Số nhà"
              register={register}
              errors={errors}
              id="street"
              fullWidth
              placeholder="Nhập số nhà, đường, phố cụ thể"
              inputClassName="border-gray-300"
            />
          </div>
          <div className="mt-4">
            <InputForm
              label="Địa chỉ chính xác"
              register={register}
              errors={errors}
              id="address"
              fullWidth
              inputClassName="border-gray-300 bg-gray-200 focus:outline-none focus:ring-transparent focus:ring-offset-0 focus:border-transparent focus: ring-0 cursor-default"
              readOnly={true}
              value={address}
              validate={{ required: "Không được bỏ trống" }}
            />
          </div>
          <div className="mt-6">
            <InputForm
              label="Gần nơi"
              register={register}
              errors={errors}
              id="surroundings"
              placeholder="Gần nơi nào?"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
            />
          </div>
          <h1 className="text-lg font-semibold mt-6 text-main-blue">
            2. Thông tin mô tả
          </h1>
          <div className="mt-6 relative z-10">
            <SelectLib
              options={postTypes?.map((el) => ({
                ...el,
                value: el.code,
                label: el.name,
              }))}
              onChange={(val) => setValue("post_type", val)}
              value={post_type}
              className="col-span-1"
              label="Loại tin đăng"
              id="post_type"
              register={register}
              errors={errors}
              validate={{ required: "Trường này không được bỏ trống." }}
            />
          </div>
          <div className="mt-4">
            <InputForm
              label="Tựa đề"
              register={register}
              errors={errors}
              id="title"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              placeholder="Tựa đề tin đăng"
              inputClassName="border-gray-300"
            />
          </div>
          <div className="mt-4">
            <TextField
              label="Nội dung mô tả"
              id="description"
              onChange={(val) => setValue("description", val)}
              placeholder="Điền mô tả về thông tin chỗ cho thuê"
              value={description}
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <InputForm
              label="Giá cho thuê (đồng/tháng)"
              register={register}
              errors={errors}
              id="price"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300"
              type="number"
              wrapClassanme="col-span-1"
            />
            <InputForm
              label="Diện tích (m2)"
              register={register}
              errors={errors}
              id="acreage"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300"
              type="number"
              wrapClassanme="col-span-1"
            />
            <InputForm
              label="Tổng số phòng"
              register={register}
              errors={errors}
              id="numberRoom"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300"
              type="number"
              wrapClassanme="col-span-1"
            />
            <InputForm
              label="Số phòng trống"
              register={register}
              errors={errors}
              id="emptyRoom"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300"
              type="number"
              wrapClassanme="col-span-1"
            />
            <InputForm
              label="Số người ở 1 phòng"
              register={register}
              errors={errors}
              id="stayMax"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300"
              type="number"
              wrapClassanme="col-span-1"
            />
            <InputForm
              label="Giá tiền điện"
              register={register}
              errors={errors}
              id="electricityPrice"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300"
              type="number"
              wrapClassanme="col-span-1"
            />
            <InputForm
              label="Giá tiền nước"
              register={register}
              errors={errors}
              id="waterPrice"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300"
              type="number"
              wrapClassanme="col-span-1"
            />
            <SelectLib
              options={targets}
              onChange={(val) => setValue("object", val)}
              value={object}
              className="col-span-1"
              label="Đối tượng cho thuê"
              id="object"
              register={register}
              validate={{ required: "Trường này không được bỏ trống." }}
              errors={errors}
            />
          </div>
          <div className="mt-4">
            <Convenient
              convenient={convenient}
              onChange={(val) => setValue("convenient", val)}
            />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <label className="font-medium" htmlFor="images">
              Chọn ảnh
            </label>
            <input
              multiple
              {...register("images", {
                required: "Trường này không được bỏ trống.",
              })}
              type="file"
              id="images"
            />
            {errors?.images && (
              <small className="text-xs text-red-500">
                {errors.images?.message}
              </small>
            )}
            <div className="grid grid-cols-4 gap-4">
              {imagesBase64?.map((el, idx) => (
                <div
                  onMouseEnter={() => setImageHover(el)}
                  onMouseLeave={() => setImageHover()}
                  className="col-span-1 w-full relative"
                  key={idx}
                >
                  <img src={el} alt="" className="w-full object-contain" />
                  {imageHover === el && (
                    <div
                      onClick={() => removeFileFromFileList(idx, "images")}
                      className="absolute inset-0 text-white cursor-pointer flex items-center justify-center bg-overlay-70"
                    >
                      <ImBin />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </section>
    //
  )
}

export default UpdatePost
