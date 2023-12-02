import { Title } from "@/components"
import React, { useState, useEffect } from "react"
import {
  BsPencilSquare,
  BsFillTrashFill,
  BsFillPatchPlusFill,
} from "react-icons/bs"
import { getOrderHouse } from "@/apis/supperAdmin/order/order"
import axios from "axios"
import { Fragment } from "react"
const ManagerService = () => {
  const [showModalOrder, setshowModalOrder] = useState(false);
  const [statusModalOrder, setstatusModalOrder] = useState(false);

  const [orderHouseData, setOrderHouseData] = useState([]);

  const [form, setform] = useState({
    "orderId": "",
    "roomId": null,
    "electricity": 0,
    "water": 0,
    "statusPayment": 'N',
    "paymentDate": null,
  })

  const fillDataFrom = (data) => {
    setform({
      "orderId": data.orderId,
      "roomId": data.roomId,
      "electricity": data.electricity,
      "water": data.water,
      "total": data.total,
      "statusPayment": data.statusPayment,
      "paymentDate": data.paymentDate,

    })
  }

  var [callApi, setcallApi] = useState(true);
  useEffect(() => {
    getOrderHouse().then(response => {
      // Handle the response data here
      console.log(response)
      setOrderHouseData(response);
    }).catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
  }, [callApi]);
  const reLoad = () => {
    setcallApi(!callApi)
  }

  const setDataFromById = (id) => {
    axios.get(`http://localhost:8080/room-master/order` + `/` + id).then(response => {
      console.log(response.data);
      fillDataFrom(response.data)
    }).catch(err => {
      console.error(err.data);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    if (form.orderId != '') {
      // edit
      axios.put('http://localhost:8080/room-master/order' + `/` + form.orderId, form).then(response => {
        // Handle the response data here
        reLoad()
        setshowModalOrder(!showModalOrder)
        console.log(response);
      }).catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    } else {
      axios.post('http://localhost:8080/room-master/order', form).then(response => {
        // Handle the response data here
        console.log("form : ", form)
        reLoad()
        setshowModalOrder(!showModalOrder)
        console.log(response);
      }).catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    }


  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding property in the person state
    setform((form) => ({
      ...form,
      [name]: value,
    }));
  };




  return (
    <>
      <section className="mb-[20px]">
        <Title title="Quản lý tiền phòng"></Title>
      </section>

      <div className="px-4">
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-2 border border-[#e2e1e1]">
          <div className="pb-4 bg-white dark:bg-white-900 px-4 py-4">
            <div className="grid justify-end bg-white">
              <ul className="my-2">
                <li className="font-bold cursor-pointer px-5 mx-2 py-3 inline text-sm font-medium text-center text-white rounded-lg bg-[#26B99A] hover:bg-green-800"
                  onClick={() => {
                    setshowModalOrder(true)
                    setstatusModalOrder(true)
                  }}>
                  <button className="flex inline-flex items-center px-4">
                    Thêm dịch vụ <BsFillPatchPlusFill size={15} className="inline ml-3" />
                  </button>
                </li>
                <li className="font-bold cursor-pointer px-5 mx-2 py-3 inline text-sm font-medium text-center text-white rounded-lg bg-[red] hover:bg-red-800"
                  onClick={() => {

                  }}>
                  <button>Xóa dịch vụ <BsFillTrashFill size={15} className="ml-1 inline" /></button>
                </li>
              </ul>
            </div>

          </div>
          <table className="w-full text-sm text-center rtl:text-right text-[black] font-mono">
            <thead className="text-base text-[white] uppercase bg-[#059669]">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Phòng
                </th>
                <th scope="col" className="px-6 py-3">
                  Điện
                </th>
                <th scope="col" className="px-6 py-3">
                  Nước
                </th>
                <th scope="col" className="px-6 py-3">
                  Thành tiền
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày thanh toán
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-base font-medium">
              {orderHouseData.map((order) =>
                <Fragment key={order.orderId}>
                  <tr className="bg-white hover:bg-[#0000000d] border-b border-gray-400">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2" />
                        <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {order.roomId}
                    </td>
                    <td className="px-6 py-4">
                      {order.electricity}
                    </td>
                    <td className="px-6 py-4">
                      {order.water}
                    </td>
                    <td className="px-6 py-4">
                      {order.total}
                    </td>
                    <td className="px-6 py-4">
                      {order.statusPayment}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.paymentDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>

                    <td className="px-6 py-4">
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                        setDataFromById(order.orderId)
                        setshowModalOrder(true)

                      }}>Edit</button>
                    </td>
                  </tr>

                </Fragment>)
              }

            </tbody>
          </table>
        </div>
      </div>

      {/* room modal */}
      {showModalOrder ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-10 " style={{ width: '1000px' }}>
              <div className="relative bg-white rounded-lg shadow shadow-black">
                <div className="flex items-center justify-between py-5 mx-4 border-b border-[#0000002e] rounded-t">
                  <h3 className="text-xl font-semibold text-black">
                    {!statusModalOrder ? "Sửa thông tin phòng" : "Thêm phòng"}
                  </h3>
                  <button onClick={() => {
                    setshowModalOrder(false)
                  }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                  <div className="grid grid-rows- gap-4">
                    <div className="grid grid-cols-5 gap-4">
                      <label htmlFor="roomId" className="block mb-2 text-sm font-medium text-black">
                        Phòng
                      </label>
                      <input type="text" name="roomId" id="roomId"
                        className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nhập Tên dịch vụ"
                        required="" value={form.roomId}
                        onChange={handleInputChange}
                      />

                    </div>

                    <div className="grid grid-cols-5 gap-4">
                      <label htmlFor="electricity" className="block mb-2 text-sm font-medium text-black">
                        Số chỉ điện
                      </label>
                      <input type="text" name="electricity" id="electricity"
                        className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nhập Tên dịch vụ"
                        required="" value={form.electricity}
                        onChange={handleInputChange}
                      />

                    </div>

                    <div className="grid grid-cols-5 gap-4">
                      <label htmlFor="electricity" className="block mb-2 text-sm font-medium text-black">
                        Số chỉ nước
                      </label>
                      <input type="text" name="water" id="water"
                        className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nhập Tên dịch vụ"
                        required="" value={form.water}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {statusModalOrder ? (
                    <button type="submit" className="mt-10 text-white inline-flex items-center bg-[#26B99A] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                      <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                      Thêm phòng
                    </button>
                  ) : (
                    <button type="submit" className="mt-10 text-white inline-flex items-center bg-[#26B99A] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                      <BsPencilSquare size={15} className="mr-2 inline" /> Cập nhật thông tin phòng
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null
      }




    </>
  )
}

export default ManagerService
