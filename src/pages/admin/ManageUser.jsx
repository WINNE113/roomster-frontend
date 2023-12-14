import { Button, Pagination, Title } from "@/components"
import withBaseTopping from "@/hocs/WithBaseTopping"
import { modal } from "@/redux/appSlice"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import UpdateUser from "./UpdateUser"
import useDebounce from "@/hooks/useDebounce"
import {
  apiDeleteUser,
  apiGetUsersByAdmin,
  apiGetUsersDeletedByAdmin,
} from "@/apis/user"
import moment from "moment"
// import UpdatePost from './UpdatePost'

const ManageUser = ({ dispatch }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm()
  const keyword = watch("keyword")
  const [users, setUsers] = useState([])
  const [counts, setCounts] = useState(0)
  const [searchParams] = useSearchParams()
  const deleted = watch("deleted")
  const roleName = watch("roleName")
  const [update, setUpdate] = useState(false)
  const fetchUsers = async (params) => {
    const response = await apiGetUsersByAdmin(params)
    if (response.data) {
      setUsers(response.data)
      setCounts(response.count)
    }
  }
  const fetchUsersDeleted = async (params) => {
    const response = await apiGetUsersDeletedByAdmin(params)
    if (response.data) {
      setUsers(response.data)
      setCounts(response.count)
    }
  }
  useEffect(() => {
    const { page, ...searchParamsObject } = Object.fromEntries([
      ...searchParams,
    ])
    if (page && Number(page)) searchParamsObject.page = Number(page) - 1
    else searchParamsObject.page = 0
    searchParamsObject.limit = 5
    if (deleted) {
      fetchUsersDeleted(searchParamsObject)
    } else {
      fetchUsers(searchParamsObject)
    }
  }, [searchParams, update, deleted, roleName])
  const render = () => {
    setUpdate(!update)
  }
  const handleDeleteUser = (uid) => {
    Swal.fire({
      icon: "warning",
      title: "Xác nhận thao tác",
      text: "Bạn có chắc muốn xóa thành viên này?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Quay lại",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteUser({ listId: uid })
        if (response.success) {
          toast.success(response.message)
          render()
        } else toast.error(response.message)
      }
    })
  }
  return (
    <section className="mb-[200px]">
      <Title title="Quản lý thành viên"></Title>
      <div className="p-4">
        <div className="flex items-center justify-end gap-6">
          <div className="flex items-center gap-2">
            <label htmlFor="deleted">Lọc theo: </label>
            <select
              onChange={(e) => setValue("roleName", e.target.value)}
              className="form-select rounded-md"
              id="roleName"
            >
              <option value="">Tất cả role</option>
              <option value="ROLE_MANAGER">Manager</option>
              <option value="ROLE_USER">Thành viên</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => setValue("deleted", e.target.checked)}
              id="deleted"
            />
            <label htmlFor="deleted">Hiển thị tài khoản đã xóa</label>
          </div>
        </div>
        <div className="mt-6 w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="border">
                <th className="p-2 border font-medium text-center">User ID</th>
                <th className="p-2 border font-medium text-center">Aavatar</th>
                <th className="p-2 border font-medium text-center">
                  Tên thành viên
                </th>
                <th className="p-2 border font-medium text-center">
                  Số điện thoại
                </th>
                <th className="p-2 border font-medium text-center">
                  Đã xác minh điện thoại
                </th>
                <th className="p-2 border font-medium text-center">Email</th>
                <th className="p-2 border font-medium text-center">Địa chỉ</th>
                <th className="p-2 border font-medium text-center">Vai trò</th>
                <th className="p-2 border font-medium text-center">
                  Sinh nhật
                </th>
                <th className="p-2 border font-medium text-center">
                  Trạng thái
                </th>
                <th className="p-2 border bg-emerald-700 text-white font-medium text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users?.map((el) => (
                <tr className="border" key={el.id}>
                  <td className="p-2 text-center">{el.userId}</td>
                  <td className="p-2 text-center">
                    <span className="flex items-center gap-2">
                      <img
                        src={el.images || "/user.svg"}
                        alt="avatar"
                        className="w-8 h-8 object-cover rounded-md"
                      />
                    </span>
                  </td>
                  <td className="p-2 text-center">{el.userName}</td>
                  <td className="p-2 text-center">{el.phoneNumber}</td>
                  <td className="p-2 text-center">
                    {el.phoneNumberConfirmed ? "Đã xác minh" : "Chưa xác minh"}
                  </td>
                  <td className="p-2 text-center">{el.email}</td>
                  <td className="p-2 text-center">{el.address}</td>
                  <td className="p-2 text-center">
                    {el.roleList?.map((el) => el.name)?.join(" / ")}
                  </td>
                  <td className="p-2 text-center">
                    {moment(el.dateOfBirth).format("DD/MM/YYYY")}
                  </td>
                  <td className="p-2 text-center">
                    {!el.active ? "Đang tạm khóa" : "Đang hoạt động"}
                  </td>
                  <td className="flex items-center justify-center gap-2 p-2">
                    {/* <span
                      onClick={() =>
                        dispatch(
                          modal({
                            isShowModal: true,
                            modalContent: (
                              <UpdateUser render={render} editUser={el} />
                            ),
                          })
                        )
                      }
                      className="text-lg text-main-red cursor-pointer px-1"
                    >
                      <AiOutlineEdit />
                    </span> */}
                    <span
                      onClick={() => handleDeleteUser(el.userId)}
                      className="text-lg text-main-red cursor-pointer px-1"
                    >
                      <AiFillDelete />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Pagination totalCount={counts} />
        </div>
      </div>
    </section>
  )
}

export default withBaseTopping(ManageUser)
