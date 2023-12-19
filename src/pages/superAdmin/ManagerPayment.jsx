import { Title } from "@/components"
import { useState, useEffect } from "react"
import path from "@/ultils/path"
import {
  BsFillEyeFill,
  BsPencilSquare,
  BsEnvelopeAtFill,
  BsDownload,
} from "react-icons/bs"
import { getOrder, getOrderById, updatePaymentOrder, sendbillOrder, downloadOrder } from "@/apis/supperAdmin/order/order"
import { getListHouse } from "@/apis/supperAdmin/house/house"
import { Fragment } from "react"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"

const ManagerService = () => {
  const [showModalOrder, setshowModalOrder] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(false);
  const [houseData, setHouseData] = useState([]);
  const [currentHouseId, setCurrentHouseId] = useState(null);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [orderHouseData, setOrderHouseData] = useState([]);
  const [isSendMail, setIsSendMail] = useState(false);
  const navigate = useNavigate();

  const [form, setform] = useState({
    "totalPayment": 0,
    "total": 0,
    "rest": 0,
  })

  const [formOrderValidate, setFormOrderValidate] = useState({
    "total": true,
    "totalPayment": true,
    "rest": true,
  })

  const validatePayment = () => {
    const newValidity = {
      "total": true,
      "stayMax": true,
      "rest": form.rest <= form.total - form.totalPayment,
    };
    // Update the validity state for all fields
    setFormOrderValidate(newValidity);
    // Return true if all fields are valid, false otherwise
    return Object.values(newValidity).every((valid) => valid);
  };

  const fillDataFrom = (data) => {
    setform({
      "total": data.total,
      "totalPayment": data.totalPayment,
      "rest": data.total - data.totalPayment
    })
  }

  const setDefalutFormOrder = () => {
    setform({
      "totalPayment": 0,
      "total": 0,
      "rest": 0,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const rest = value
    // Update the corresponding property in the person state
    setform((form) => ({
      ...form,
      [name]: parseInt(value),
    }));
    setFormOrderValidate((formOrderValidate) => ({
      ...formOrderValidate,
      [name]: value != 0 && parseInt(value) <= (form.total - form.totalPayment),
    }));
  };


  var [callApi, setcallApi] = useState(true);

  useEffect(() => {
    getListHouse().then((house) => {
      setHouseData(house);
      setCurrentHouseId(currentHouseId ? currentHouseId : house[0].houseId)
      setCurrentRoomId(currentRoomId ? currentRoomId : house[0].rooms[0].id);
    })

    getOrder().then((orders) => {
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

  const setDataFromById = (id) => {
    setCurrentOrderId(id)
    getOrderById(id).then(response => {
      fillDataFrom(response)
    }).catch(err => {
      console.error(err)
    })
  }

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    const data = {
      "date": "",
      "billNumber": form.totalPayment + form.rest
    }

    if (validatePayment()) {
      updatePaymentOrder(currentOrderId, data).then(response => {
        if (response.data) {
          toast.error(response.data.message)
        } else {
          toast.success(response.message)
        }
        reLoad()
      }).finally(() => {
        setshowModalOrder(false)
        setDefalutFormOrder();
      });
    } else {
      toast.info("Vui lòng nhập đúng số tiền !")
    }
  }

  const handleSendBill = () => {
    toast.info("Đang gửi hãy chờ trong giây lát...");
    sendbillOrder(currentRoomId).then((response) => {
      if (response.data) {
        toast.error(response.data.message)
      } else {
        toast.success(response.message)
      }
    }).finally(() => {
      setIsSendMail(false)
    })
  }

  const handleDownLoad = () => {
    toast.info("Đang tải...");
    downloadOrder("blob").then((response) => {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'THONG_KE.xlsx');
      document.body.appendChild(link);
      link.click();
      toast.success("Tải thành công")
      document.body.removeChild(link);
    });
  };


  return (
    <>
      <section className="mb-[20px]">
        <Title title="Quản lý tiền phòng"></Title>
      </section>
      <div className="px-4">
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-2 border border-[#e2e1e1]">
          <div className="pb-4 bg-white dark:bg-white-900 px-4 py-4 flex">
            <div className="flex w-full">
              <div>
                <span className="my-2 text-lg font-semibold self-center">Quản lý đơn phòng :</span>
              </div>
              <div className="flex justify-start bg-white">
                <select className="self-center ml-4 bg-white border border-gray-300 text-black text-center text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 py-2 px-4 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={(e) => handleHouseChange(e.target.value)}>
                  {houseData && houseData.length > 0 && houseData.map(house => (
                    <Fragment key={house.houseId}>
                      <option className="text-start" value={house.houseId}>{house.houseName}</option>
                    </Fragment>
                  ))}
                </select>
                <select className="self-center ml-4 bg-white border border-gray-300 text-black text-center text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 py-2 px-4 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={(e) => handleRoomChange(e.target.value)}
                  onClick={(e) => handleRoomChange(e.target.value)}>
                  {houseData && houseData.length > 0 && houseData.map((house) => (
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

            <div className="w-full flex justify-end self-center bg-white">
              <ul className="my-2">
                <li className={`${isSendMail ? "pointer-events-none opacity-50" : ""}  font-bold cursor-pointer px-5 mx-2 py-3 inline text-sm font-medium text-center text-white rounded-lg bg-[#26B99A] hover:bg-green-800`}
                  onClick={() => {
                    setIsSendMail(true)
                    handleSendBill()
                  }}>
                  <button className="flex inline-flex items-center px-4">
                    Gửi bill phòng <BsEnvelopeAtFill size={15} className="inline ml-3" />
                  </button>
                </li>
                <li className="font-bold cursor-pointer px-5 mx-2 py-3 inline text-sm font-medium text-center text-white rounded-lg bg-[#26B99A] hover:bg-green-800"
                  onClick={() => {
                    handleDownLoad()
                  }}>
                  <button className="flex inline-flex items-center px-4">
                    Download <BsDownload size={15} className="inline ml-3" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <table className="w-full text-sm text-center rtl:text-right text-[black] font-mono">
            <thead className="text-base text-[white] uppercase bg-[#059669]">
              <tr>
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
                  Đã chuyển
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
              {orderHouseData != null && orderHouseData.length > 0 && orderHouseData.filter(order => order.roomId == currentRoomId).length > 0 ? (
                orderHouseData
                  .filter(order => order.roomId == currentRoomId)
                  .map((order) => (
                    <Fragment key={order.orderId}>
                      <tr className="bg-white hover:bg-[#0000000d] border-b border-gray-400">
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(parseInt(order.electricity))}
                        </td>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(parseInt(order.water))}
                        </td>
                        <td className="px-6 py-4">
                          {order.priceService && order.priceService > 0
                            ? new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(parseInt(order.priceService))
                            : 'No services'
                          }
                        </td>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(parseInt(order.priceRoom))}
                        </td>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(parseInt(order.total))}
                        </td>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(parseInt(order.totalPayment))}
                        </td>
                        <td className={
                          order.statusPayment === 'Y' ? "px-6 py-4 text-[green]"
                            : order.statusPayment === 'N' ? "px-6 py-4 text-[red]"
                              : order.statusPayment === 'P' ? "px-6 py-4 text-[orange]"  // Change 'orange' to the desired color
                                : "px-6 py-4 text-[gray]"  // Default color for unknown status
                        }>
                          {order.statusPayment === 'Y' ? 'Đã thanh toán'
                            : order.statusPayment === 'N' ? 'Chưa thanh toán'
                              : order.statusPayment === 'P' ? 'Còn nợ'  // Change 'Còn nợ' to the desired text
                                : 'Unknown Status'
                          }
                        </td>
                        <td className="px-6 py-4">
                          {new Date(order.paymentDate).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </td>

                        <td className="px-6 py-4">
                          <button className={order.statusPayment == 'Y' ? "font-medium text-blue-600 dark:text-blue-500 hover:underline pointer-events-none opacity-25" : "font-medium text-blue-600 dark:text-blue-500 hover:underline"}
                            onClick={() => {
                              setDataFromById(order.orderId)
                              setshowModalOrder(true)
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
      </div >

      {/* order modal */}
      {showModalOrder ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-10 " style={{ width: '1000px' }}>
              <div className="relative bg-white rounded-lg shadow shadow-black">
                <div className="flex items-center justify-between py-5 mx-4 border-b border-[#0000002e] rounded-t">
                  <h3 className="text-xl font-semibold text-black">
                    Cập nhật số tiền đã thanh toán
                  </h3>
                  <button onClick={() => {
                    setshowModalOrder(false)
                    setDefalutFormOrder();
                  }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmitPayment} className="p-4 md:p-5">
                  <div className="grid grid-rows- gap-4">
                    <div className="grid grid-cols-5 gap-4">
                      <label htmlFor="totalPayment" className="block mb-2 text-sm font-medium text-black">
                        Số tiền đã trả
                      </label>
                      <input type="number" name="totalPayment" id="totalPayment"
                        className={`bg-white border focus:border-black text-black text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 pointer-events-none opacity-75`}
                        required=""
                        value={form.totalPayment}
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      <label htmlFor="total" className="block mb-2 text-sm font-medium text-black">
                        Tổng số tiền
                      </label>
                      <input type="number" name="total" id="total"
                        className={`bg-white border focus:border-black text-black text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 pointer-events-none opacity-75`}
                        required=""
                        value={form.total}
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      <label htmlFor="rest" className="block mb-2 text-sm font-medium text-black">
                        Số tiền phải trả
                      </label>
                      <input type="number" name="rest" id="rest"
                        className={`bg-white border ${!formOrderValidate.rest ? 'border-red-500' : 'border-gray-300'} focus:border-black text-black text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400`}
                        required=""
                        placeholder={`Phải trả ` + (form.total - form.totalPayment)}
                        value={form.rest}
                        onChange={handleInputChange}
                        onClick={handleInputChange}
                      />
                    </div>
                  </div>
                  <button type="submit" className="mt-10 text-white inline-flex items-center bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                    <BsPencilSquare size={15} className="mr-2 inline" /> Cập nhật số tiền đã thanh toán
                  </button>
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
