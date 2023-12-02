import { Title } from "@/components"
import { useState, useEffect } from "react"
import { Fragment } from "react"
import axios from "axios"
import { BsPencilSquare } from "react-icons/bs"

const ManagerWater = () => {

  const [waterModal, setWaterModal] = useState(false)
  const [waterData, setWaterData] = useState([]);
  const [houseData, setHouseData] = useState([]);
  const [currentHouseId, setCurrentHouseId] = useState(1);
  const [currentRoomId, setCurrentRoomId] = useState(1);

  const [form, setform] = useState({
    "orderId": null,
    "roomId": null,
    "roomName": null,
    "water": null,
    "electricity": null
  })
  var [callApi, setcallApi] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/room-master/house`).then(response => {
      // Handle the response data here
      setHouseData(response.data);
    }).catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });

    axios.get("http://localhost:8080/room-master/room/" + currentRoomId).then(response => {
      // Handle the response data here
      setWaterData(response.data);
    }).catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });

  }, [callApi]);


  const reLoad = () => {
    setcallApi(!callApi)
  }

  const fillDataFrom = (data) => {
    setform({
      "orderId": data.orderId,
      "roomId": data.roomId,
      "water": data.water,
      "electricity": data.electricity,
      "paymentDate": data.paymentDate
    })
  }

  const setDataFromById = (id) => {
    console.log(id);
    axios.get(`http://localhost:8080/room-master/order` + `/` + id).then(response => {
      fillDataFrom(response.data)
    }).catch(err => {
      console.error(err);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8080/room-master/order' + "/" + form.orderId.toString(), form).then(response => {
      // Handle the response data here
      reLoad()
      setWaterModal(!waterModal)
      console.log(response);
    }).catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding property in the person state
    setform((form) => ({
      ...form,
      [name]: value,
    }));
  };

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
    reLoad();
  };

  return (
    <>
      <section className="mb-[20px]">
        <Title title="Quản lý số nước"></Title>
      </section>
      <div className="px-4">
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-2 border border-[#e2e1e1]">
          <div className=" flex pb-4 bg-white dark:bg-white-900 px-4 py-4">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="table-search" className="block pt-2 pb-2 ps-10 text-sm text-black border border-gray-300 rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
            </div>
            <select className="self-center ml-4 bg-white border border-gray-300 text-black text-center text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 py-2 px-4 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={(e) => handleHouseChange(e.target.value)}>
              {houseData.map(house => (
                <Fragment key={house.houseId}>
                  <option className="text-start" value={house.houseId}>{house.houseName}</option>
                </Fragment>
              ))}
            </select>
            <select className="self-center ml-4 bg-white border border-gray-300 text-black text-center text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 py-2 px-4 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={(e) => handleRoomChange(e.target.value)}>
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
                  Số chỉ điện sử dụng
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lit nước sử dụng
                </th>
                <th scope="col" className="px-6 py-3">
                  Tháng
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-base font-medium">
              {waterData.orders != null ? (
                waterData.orders.map((order) => (
                  <Fragment key={order.orderId}>
                    <tr className="bg-white hover:bg-[#0000000d] border-b border-gray-400">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {order.electricity} <span>chỉ</span>
                      </td>
                      <td className="px-6 py-4">
                        {order.water} <span>lít</span>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order.paymentDate).toLocaleString('en-US', {
                          month: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                          setDataFromById(order.orderId)
                          setWaterModal(true)
                        }}>Edit</button>
                      </td>
                    </tr>
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    {waterData.orders === null ? 'Loading...' : 'Chưa có đơn đặt cho phòng này.'}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* room modal */}
      {waterModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-10 " style={{ width: '1000px' }}>
              <div className="relative bg-white rounded-lg shadow shadow-black">
                <div className="flex items-center justify-between py-5 mx-4 border-b border-[#0000002e] rounded-t">
                  <h3 className="text-xl font-semibold text-black">
                    Cập nhật điện nước phòng
                  </h3>
                  <button onClick={() => {
                    setWaterModal(false)
                  }} type="button" className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                  <div className="grid grid-rows gap-4">
                    <div className="grid grid-cols-5 gap-4">
                      <label htmlFor="serviceName" className="block mb-2 text-sm font-medium text-black">
                        Tháng
                      </label>
                      <div className="bg-white border-b border-gray-300 text-black text-sm p-2.5">
                        {new Date(form.paymentDate).toLocaleString('en-US', {
                          month: '2-digit',
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                      <label htmlFor="water" className="block mb-2 text-sm font-medium text-black">
                        Số chỉ điện
                      </label>
                      <input type="number" name="water" id="water"
                        className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nhập số chỉ điện"
                        required="" value={form.water}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      <label htmlFor="electricity" className="block mb-2 text-sm font-medium text-black">
                        Số lít nước
                      </label>
                      <input type="number" name="electricity" id="electric"
                        className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nhập số lít nước"
                        required="" value={form.electricity}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <button type="submit" className="mt-10 text-white inline-flex items-center bg-[#26B99A] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                    <BsPencilSquare size={15} className="mr-2 inline" /> Cập nhật thông tin phòng
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

export default ManagerWater
