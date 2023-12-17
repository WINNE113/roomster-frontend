import { apiGetPostTypes } from "@/apis/app"
import { apiGetDetailPost } from "@/apis/post"
import {
  Button,
  Convenient,
  InputForm,
  Map,
  MdEditor,
  SelectLib,
  TextField,
} from "@/components"
import { targets } from "@/ultils/constant"
import { getBase64 } from "@/ultils/fn"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ImBin } from "react-icons/im"
import { useSelector } from "react-redux"

const UpdatePost = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [detailPost, setDetailPost] = useState()
  const [postTypes, setPostTypes] = useState([])
  const [imagesBase64, setImagesBase64] = useState([])
  const {
    formState: { errors },
    watch,
    register,
    getValues,
    reset,
    setValue,
    handleSubmit: validate,
  } = useForm()
  const fetchPostById = async () => {
    const response = await apiGetDetailPost({ postId })
    if (response) setDetailPost(response)
  }
  const fetchPostTypes = async () => {
    const response = await apiGetPostTypes()
    setPostTypes(response || [])
  }
  useEffect(() => {
    fetchPostTypes()
  }, [])
  useEffect(() => {
    fetchPostById()
  }, [postId])
  const convenient = watch("convenient")
  useEffect(() => {
    if (detailPost) {
      reset({
        address: detailPost?.postDetail?.address,
        surroundings: detailPost?.postDetail?.surroundings,
        title: detailPost?.postDetail?.title,
        postType: detailPost?.postDetail?.postType,
        price: detailPost?.postDetail?.price,
        acreage: detailPost?.postDetail?.acreage,
        electricityPrice: detailPost?.postDetail?.electricityPrice,
        stayMax: detailPost?.postDetail?.stayMax,
        waterPrice: detailPost?.postDetail?.waterPrice,
        object: detailPost?.postDetail?.object,
        description: detailPost?.postDetail?.description,
        convenient: detailPost?.postDetail?.convenient,
      })
    }
  }, [detailPost])
  const convertFileToBase64 = async (file) => {
    const base64 = await getBase64(file)
    if (base64) setImagesBase64((prev) => [...prev, base64])
  }
  useEffect(() => {
    setImagesBase64([])
    const images = watch("images")
    if (images && images instanceof FileList)
      for (let file of images) convertFileToBase64(file)
  }, [watch("images")])

  const handleUpdate = (data) => {
    const {
      numberRoom,
      emptyRoom,
      stayMax,
      acreage,
      price,
      electricityPrice,
      waterPrice,
      ...payload
    } = data
    payload.roomDto = {
      numberRoom,
      emptyRoom,
      stayMax,
      acreage,
      price,
      electricityPrice,
      waterPrice,
    }
    payload.postId = postId
    payload.convenient = convenient
    console.log(payload)
  }
  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className="w-4/5 mx-auto max-h-screen overflow-y-auto relative bg-white p-4"
    >
      <div className="p-4 flex items-center justify-between border-b">
      <h1 className="text-2xl font-bold tracking-tight">{`Cập nhật tin đăng #${postId}`}</h1>
        <div className="flex items-center gap-4">
        <Button onClick={validate(handleUpdate)} disabled={isLoading}>
            Cập nhật
          </Button>
          <Button className="bg-main-yellow">Cancel</Button>
        </div>
      </div>
      <form className="p-4 grid grid-cols-12 gap-6">
        <div className="col-span-12">
          
          
          <div className="mt-4">
            <InputForm
              label="Địa chỉ cho thuê"
              register={register}
              errors={errors}
              id="address"
              fullWidth              
              validate={{ required: "Không được bỏ trống" }}
            />
          </div>
          <div className="mt-6">
            <InputForm
              label="Gần nơi"
              register={register}
              errors={errors}
              id="surroundings"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
            />
          </div>
          <div className="mt-6 relative flex flex-col gap-2 z-10">
            <label htmlFor="" className="font-semibold">
              Thể loại
            </label>
            <select
              className="form-select border-gray-200 rounded-md"
              {...register("postType", {
                required: "Trường này không được bỏ trống.",
              })}
            >
              {postTypes?.map((el) => (
                <option key={el.code} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
            {errors["postType"] && (
              <small className="text-xs text-red-500">
                {errors["postType"]?.message}
              </small>
            )}
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
          <MdEditor
              id="description"
              errors={errors}
              validate={{ required: "Trường này không được bỏ trống." }}
              register={register}
              label="Nội dung mô tả"
              height={400}
              setValue={setValue}
              value={getValues("description")}
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
            <div className="relative flex flex-col gap-2 z-10">
              <label htmlFor="" className="font-semibold">
                Đối tượng cho thuê
              </label>
              <select
                className="form-select border-gray-200 rounded-md"
                {...register("object", {
                  required: "Trường này không được bỏ trống.",
                })}
              >
                {targets?.map((el) => (
                  <option key={el.code} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
              {errors["object"] && (
                <small className="text-xs text-red-500">
                  {errors["object"]?.message}
                </small>
              )}
            </div>
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
            <input multiple {...register("images")} type="file" id="images" />
            {errors?.images && (
              <small className="text-xs text-red-500">
                {errors.images?.message}
              </small>
            )}
            <div className="grid grid-cols-4 gap-4">
            {imagesBase64.length === 0 &&
                detailPost?.images?.map((el, idx) => (
                  <div className="col-span-1 w-full relative" key={idx}>
                    <img
                      src={el.image}
                      alt=""
                      className="w-full object-contain"
                    />
                  </div>
                ))}
              {imagesBase64.length > 0 &&
                imagesBase64?.map((el, idx) => (
                  <div className="col-span-1 w-full relative" key={idx}>
                    <img src={el} alt="" className="w-full object-contain" />
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
