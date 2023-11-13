import { Pagination, Title } from "@/components"
import withBaseTopping from "@/hocs/WithBaseTopping"
import { modal } from "@/redux/appSlice"
import { formatMoney } from "@/ultils/fn"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  AiFillDelete,
  AiFillInfoCircle,
  AiFillStar,
  AiOutlineEdit,
  AiOutlineInfoCircle,
} from "react-icons/ai"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import UpdatePost from "./UpdatePost"
import useDebounce from "@/hooks/useDebounce"
import { useSelector } from "react-redux"
import clsx from "clsx"

const ManagePost = ({ dispatch }) => {
  const { setValue, watch } = useForm()
  const { current } = useSelector((s) => s.user)
  const keyword = watch("keyword")
  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams()
  const [update, setUpdate] = useState(false)
  const fetchPosts = async (params) => {}
  const debounceValue = useDebounce(keyword, 500)
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    params.postedBy = current?.id
    params.limit = import.meta.env.VITE_LIMIT
    if (debounceValue) params.keyword = debounceValue
    fetchPosts(params)
  }, [searchParams, update, debounceValue])
  const render = () => {
    setUpdate(!update)
  }
  const handleDeletePost = (pid) => {
    Swal.fire({
      icon: "warning",
      title: "Xác nhận thao tác",
      text: "Bạn có chắc muốn xóa bài đăng này?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Quay lại",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
      }
    })
  }
  return (
    <section className="mb-[200px]">
      <Title title="Quản lý tin đăng"></Title>
      <div className="p-4">
        <div className="flex items-center justify-end">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setValue("keyword", e.target.value)}
            className="max-w-[500px] w-full outline-none border p-2 placeholder:text-sm"
            placeholder="Tìm kiếm tên, địa chỉ..."
          />
        </div>
        <div className="mt-6 w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="border bg-emerald-800 text-white">
                <th className="p-2 font-medium text-center">Tựa đề</th>
                <th className="p-2 font-medium text-center">Đánh giá</th>
                <th className="p-2 font-medium text-center">Địa chỉ</th>
                <th className="p-2 font-medium text-center">Chuyên mục</th>
                <th className="p-2 font-medium text-center">Giá thuê</th>
                <th className="p-2 font-medium text-center">Đối tượng</th>
                <th className="p-2 font-medium text-center">Diện tích</th>
                <th className="p-2 font-medium text-center">Trạng thái thuê</th>
                <th className="p-2 font-medium text-center">Ngày hết hạn</th>
                <th className="p-2 font-medium text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {posts?.rows?.map((el) => (
                <tr className="border" key={el.id}>
                  <td className="p-2 text-center">{el.title}</td>
                  <td className="p-2 text-center ">
                    <span className="flex justify-center items-center">
                      {el.star || 0} <AiFillStar color="orange" />
                    </span>
                  </td>
                  <td className="p-2 text-center">{el.address}</td>
                  <td className="p-2 text-center">{el.cates?.value}</td>
                  <td className="p-2 text-center">{formatMoney(el.price)}</td>
                  <td className="p-2 text-center">{el.target}</td>
                  <td className="p-2 text-center">
                    {el.area}
                    <span>
                      m<sup>2</sup>
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    {el.isAvailable ? "Chưa thuê" : "Đã thuê"}
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={clsx(
                        moment(
                          moment(el.expiredDate).format("MM/DD/YYYY")
                        ).isBefore(moment())
                          ? "text-main-red"
                          : "text-green-500"
                      )}
                    >
                      {moment(el.expiredDate).format("DD/MM/YYYY")}
                    </span>
                  </td>
                  <td className="p-2">
                    <span className="flex items-center gap-2">
                      <span
                        onClick={() =>
                          dispatch(
                            modal({
                              isShowModal: true,
                              modalContent: <UpdatePost editPost={el} />,
                            })
                          )
                        }
                        title="Chỉnh sửa"
                        className="text-lg text-main-blue cursor-pointer px-1"
                      >
                        <AiOutlineEdit size={22} />
                      </span>
                      <span
                        onClick={() => handleDeletePost(el.id)}
                        className="text-lg text-main-blue cursor-pointer px-1"
                        title="Xóa"
                      >
                        <AiFillDelete size={22} />
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Pagination totalCount={posts?.count || 1} />
        </div>
      </div>
    </section>
  )
}

export default withBaseTopping(ManagePost)
