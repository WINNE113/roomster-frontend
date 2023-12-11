import { Title } from "@/components"
import { useState, useEffect } from "react"
import path from "../../ultils/path"
import {
  BsFillEyeFill,
} from "react-icons/bs"
import { getOrderHouse } from "@/apis/supperAdmin/order/order"
import { getListHouse } from "@/apis/supperAdmin/house/house"
import axios from "axios"
import { Fragment } from "react"
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom"
const ManagerService = () => {
  const [showModalOrder, setshowModalOrder] = useState(false);
  const [statusModalOrder, setstatusModalOrder] = useState(false);
  const [houseData, setHouseData] = useState([]);
  const [currentHouseId, setCurrentHouseId] = useState(1);
  const [currentRoomId, setCurrentRoomId] = useState(1);
  const [orderHouseData, setOrderHouseData] = useState([]);

  const navigate = useNavigate();
  // const [form, setform] = useState({
  //   "orderId": "",
  //   "roomId": null,
  //   "electricity": 0,
  //   "water": 0,
  //   "statusPayment": 'N',
  //   "paymentDate": null,
  // })


  // const fillDataFrom = (data) => {
  //   setform({
  //     "orderId": data.orderId,
  //     "roomId": data.roomId,
  //     "electricity": data.electricity,
  //     "water": data.water,
  //     "total": data.total,
  //     "statusPayment": data.statusPayment,
  //     "paymentDate": data.paymentDate,

  //   })
  // }

  var [callApi, setcallApi] = useState(true);
  useEffect(() => {

    getListHouse().then((house) => {
      console.log(house);
      setHouseData(house);
      setCurrentRoomId(house[0].rooms[0].id);
    })

    getOrderHouse().then((orders) => {
      setOrderHouseData(orders);
    })

  }, [callApi]);



  const reLoad = () => {
    setcallApi(!callApi)
  }


  const handleHouseChange = (value) => {
    // Update the corresponding property in the person state
    setCurrentHouseId(value)
    houseData.forEach(house => {
      if (house.houseId == value) {
        handleRoomChange(house.rooms[0].id)
      }
    })
  };

  const handleRoomChange = (value) => {
    // Update the corresponding property in the person state
    setCurrentRoomId(value)
  };
  // const setDataFromById = (id) => {
  //   axios.get(`http://localhost:8080/room-master/order` + `/` + id).then(response => {
  //     fillDataFrom(response.data)
  //   }).catch(err => {
  //     console.error(err.data)
  //   })
  // }


  return (
    <>
      <section className="mb-[20px]">
        <Title title="Quản lý tiền phòng"></Title>
      </section>

      <div className="px-4">
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-2 border border-[#e2e1e1]">
          <div className="pb-4 bg-white dark:bg-white-900 px-4 py-4 flex">
            <div className="self-center relative mt-1">
              <span className="my-2 text-lg font-semibold self-center">Quản lý đơn phòng :</span>
            </div>
            <div className="flex justify-start bg-white">
              <select className="self-center ml-4 bg-white border border-gray-300 text-black text-center text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 py-2 px-4 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={(e) => handleHouseChange(e.target.value)}>
                {houseData.map(house => (
                  <Fragment key={house.houseId}>
                    <option className="text-start" value={house.houseId}>{house.houseName}</option>
                  </Fragment>
                ))}
              </select>
              <select className="self-center ml-4 bg-white border border-gray-300 text-black text-center text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 py-2 px-4 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={(e) => handleRoomChange(e.target.value)}
                onClick={(e) => handleRoomChange(e.target.value)}>
                {houseData.map((house) => (
                  <Fragment key={house.houseId}>
                    {house.houseId == currentHouseId && house.rooms.map((r) => (
                      <Fragment key={r.id}>
                        <option className="text-start" value={r.id}>Phòng {r.numberRoom}</option>
                      </Fragment>
                    ))}
                  </Fragment>
                ))}
              </select>
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
                  Giá Điện
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá Nước
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá Dịch vụ
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá Phòng
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
                <th scope="col" className="px-6 py-3">
                  Bill
                </th>
              </tr>
            </thead>
            <tbody className="text-base font-medium">
              {orderHouseData != null && orderHouseData.filter(order => order.roomId == currentRoomId).length > 0 ? (
                orderHouseData
                  .filter(order => order.roomId == currentRoomId)
                  .map((order) => (
                    <Fragment key={order.orderId}>
                      <tr className="bg-white hover:bg-[#0000000d] border-b border-gray-400">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2" />
                            <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {order.electricity} đ
                        </td>
                        <td className="px-6 py-4">
                          {order.water} đ
                        </td>
                        <td className="px-6 py-4">
                          {order.priceService && order.priceService > 0
                            ? order.priceService + ' đ'
                            : 'No services'
                          }
                        </td>
                        <td className="px-6 py-4">
                          {order.priceRoom} đ
                        </td>
                        <td className="px-6 py-4">
                          {order.total} đ
                        </td>
                        <td className={order.statusPayment == 'Y' ? "px-6 py-4 text-[green]" : "px-6 py-4 text-[red]"}>
                          {order.statusPayment == 'Y' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(order.paymentDate).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>

                        <td className="px-6 py-4">
                          <button className={order.statusPayment == 'Y' ? "font-medium text-blue-600 dark:text-blue-500 hover:underline pointer-events-none opacity-25" : "font-medium text-blue-600 dark:text-blue-500 hover:underline"}
                            onClick={() => {
                            }}>Sửa</button>

                            </td>
                            <td className={order.statusPayment == 'Y' ? "px-6 py-4 text-[green]" : "px-6 py-4 text-[red]"}>
                              <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => {
                                  navigate(`/${path.BILL}/${order.orderId}`)
                                }}><BsFillEyeFill /></button>
                        </td>
                      </tr>

                    </Fragment>)
                  )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center">
                    Chưa có đơn đặt phòng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default ManagerService
