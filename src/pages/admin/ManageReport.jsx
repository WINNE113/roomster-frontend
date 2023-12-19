import { apiGetReports } from "@/apis/report"
import { Pagination, Title } from "@/components"
import React, { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const ManageReport = () => {
  const [update, setUpdate] = useState(false)
  const [counts, setCounts] = useState(0)
  const [searchParams] = useSearchParams()
  const [reports, setReports] = useState()
  const render = useCallback(() => {
    setUpdate(!update)
  }, [update])
  const fetchReports = async (searchParamsObject) => {
    const response = await apiGetReports(searchParamsObject)
    if (response.data) {
      setReports(response.data)
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
    fetchReports(searchParamsObject)
  }, [update, searchParams])

  return (
    <>
      <Title title="Quản lý báo cáo vi phạm"></Title>
      <div className="p-4">
        <div className="mt-6 w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="border text-emerald-700">
                <th className="p-2  border text-center">ID</th>
                <th className="p-2  border text-center">Tên dịch vụ</th>
                <th className="p-2  border text-center">Số ngày áp dụng</th>
                <th className="p-2  border text-center">Giá</th>
                <th className="p-2  border text-center">Ngày tạo</th>
                <th className="p-2  border text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* {reports?.map((el) => (
                <tr className="border" key={el.servicePackageId}>
                  <td className="p-2 text-center">{el.servicePackageId}</td>
                  <td className="p-2 text-center">{el.name}</td>
                  <td className="p-2 text-center">{el.durationDays}</td>
                  <td className="p-2 text-center">{el.price}</td>
                  <td className="p-2 text-center">
                    {moment(el.createdDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="flex items-center justify-center gap-2 p-2">
                    <span
                      onClick={() =>
                        dispatch(
                          modal({
                            isShowModal: true,
                            modalContent: (
                              <UpdatePricing render={render} editPricing={el} />
                            ),
                          })
                        )
                      }
                      className="text-lg text-main-red cursor-pointer px-1"
                    >
                      <AiOutlineEdit />
                    </span>
                    <span
                      onClick={() => handleDeletePricing(el.servicePackageId)}
                      className="text-lg text-main-red cursor-pointer px-1"
                    >
                      <AiFillDelete />
                    </span>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Pagination totalCount={counts} />
        </div>
      </div>
    </>
  )
}

export default ManageReport
