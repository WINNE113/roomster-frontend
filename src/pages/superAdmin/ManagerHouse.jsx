import { Title, DeleteConfirm } from "@/components"
import {
    BsFillPersonFill,
    BsPencilSquare,
    BsFillTrashFill,
    BsFillPatchPlusFill,
    BsFillHouseAddFill,
} from "react-icons/bs"
import { Fragment, useState, useEffect } from "react"
import { getListHouse } from "@/apis/supperAdmin/house/house"
//import { addRoom } from "@/apis/supperAdmin/room/room"
import axios from "axios"

const ManagerHouse = () => {
    const [CurentHouseSelected, setCurentHouseSelected] = useState(1);

    const [showModalHouse, setshowModalHouse] = useState(false);
    const [statusModalHouse, setstatusModalHouse] = useState(false);

    const [showModalRoom, setshowModalRoom] = useState(false);
    const [statusModalRoom, setstatusModalRoom] = useState(false);

    const [showModalTenant, setShowModalTenant] = useState(false);


    const [showModalDelete, setshowModalDelete] = useState(false);
    const [messageDelete, setmessageDelete] = useState("");
    const [typeDelete, setTypeDelete] = useState({
        type: "",
        id: 0
    });

    const [houseData, sethouseData] = useState([]);
    var [callApi, setcallApi] = useState(true);

    const [form, setform] = useState({
        "id": "",
        "numberRoom": null,
        "emptyRoom": 0,
        "stayMax": null,
        "acreage": null,
        "price": null,
        "electricityPrice": null,
        "waterPrice": null,
        "houseId": 1,
    })


    useEffect(() => {
        getListHouse().then(response => {
            // Handle the response data here
            sethouseData(response);
        }).catch(error => {
            // Handle any errors that occurred during the request
            console.error(error);
        });
    }, [callApi]);

    const setDefalutForm = () => {
        setform({
            "id": "",
            "numberRoom": null,
            "emptyRoom": 0,
            "stayMax": null,
            "acreage": null,
            "price": null,
            "electricityPrice": null,
            "waterPrice": null,
            "houseId": 1,
        })
    }

    const fillDataFrom = (data) => {
        setform({
            "id": data.id,
            "numberRoom": data.numberRoom,
            "emptyRoom": data.emptyRoom,
            "stayMax": data.stayMax,
            "acreage": data.acreage,
            "price": data.price,
            "electricityPrice": data.electricityPrice,
            "waterPrice": data.waterPrice,
            "houseId": data.houseId,
        })
    }

    const setDataFromById = (id) => {
        axios.get(`http://localhost:8080/room-master/room` + `/` + id).then(response => {
            console.log(response.data);
            fillDataFrom(response.data)
        }).catch(err => {
            console.error(err.data);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if (form.id != '') {
            // edit
            axios.put('http://localhost:8080/room-master/room' + `/` + form.id, form).then(response => {
                // Handle the response data here
                reLoad()
                setshowModalRoom(!showModalRoom)
                console.log(response);
            }).catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
        } else {
            axios.post('http://localhost:8080/room-master/room', form).then(response => {
                // Handle the response data here
                reLoad()
                setshowModalRoom(!showModalRoom)
                console.log(response);
            }).catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
        }

        setshowModalRoom(!showModalRoom)
        setDefalutForm()

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update the corresponding property in the person state
        setform((form) => ({
            ...form,
            [name]: value,
        }));
    };

    const reLoad = () => {
        setcallApi(!callApi)
    }

    const confirmDelete = (status, type) => {
        if (status) {
            //delete room
            if (type.type == 'room') {
                axios.delete(`http://localhost:8080/room-master/room` + "/" + type.id).then(response => {
                    console.log(response.data);
                    reLoad()
                    setshowModalDelete(false)
                    setTypeDelete({
                        type: "",
                        id: 0
                    })
                }).catch(err => {
                    console.error(err.data);
                })
            }


        }
        setshowModalDelete(false)
    }

    return (
        <>
            <section className="">
                <Title title="Quản lý nhà"></Title>
            </section>
            <div>
                <div>
                    <div className='flex justify-between px-8 py-4 mt-4'>
                        <div className="flex">
                            <div className="flex mx-2 self-center">
                                <label htmlFor="searchPrice" className="text-sm font-medium text-black self-center mr-4">
                                    Giá :
                                </label>
                                <input type="number" name="searchPrice" id="numberRoom"
                                    className="self-center bg-white border-b border-gray-300 text-black text-sm focus:ring-primary-600 focus:border-primary-600 p-1 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Nhập giá tìm kiếm"
                                    required="" value=""
                                />
                            </div>
                            <div className="flex mx-2 self-center">
                                <label htmlFor="searchPrice" className="text-sm font-medium text-black self-center mr-4">
                                    Diện tích :
                                </label>
                                <input type="number" name="searchPrice" id="numberRoom"
                                    className="w-1/2 self-center bg-white border-b border-gray-300 text-black text-sm focus:ring-primary-600 focus:border-primary-600 p-1 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Nhập diện tích"
                                    required="" value=""
                                />
                            </div>
                            <div className="flex mx-2 self-center">
                                <label htmlFor="searchPrice" className="text-sm font-medium text-black self-center mr-4">
                                    Số người ở tối đa :
                                </label>
                                <input type="number" name="searchPrice" id="numberRoom"
                                    className="w-1/4 self-center bg-white border-b border-gray-300 text-black text-sm p-1"
                                    placeholder="max"
                                    required="" value=""
                                />
                            </div>
                        </div>

                        <button className="font-bold cursor-pointer px-5 py-2 mr-3 inline text-sm font-medium text-center text-white rounded-lg bg-[#26B99A] hover:bg-green-800">
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <div className=" border-b border-[#0000003b] m-2 mx-6 w-4/5">
                        </div>
                    </div>
                    <div className='flex justify-between px-8 py-4'>
                        <ul className="self-center px-5 py-4 border-b-2 border-[#059669]">
                            {houseData.map((el) => (
                                <Fragment key={el.houseId}>
                                    <li className={CurentHouseSelected == el.houseId ? "font-bold cursor-pointer py-2 px-2 mx-2 inline border-b-4 border-r-2 border-l-2 border-[#059669] shadow-md shadow-[#26B99A]" : "cursor-pointer  py-2  px-2 mx-2 inline hover:border-b-4 hover:border-[#059669] hover:shadow-md hover:shadow-[#26B99A]"}
                                        onClick={() => {
                                            setCurentHouseSelected(el.houseId)
                                        }}>
                                        {el.houseName}
                                    </li>
                                </Fragment>
                            ))}
                        </ul>

                        <ul className="self-center ">
                            <li onClick={() => {
                                setshowModalRoom(true)
                                setstatusModalRoom(true)
                            }} className="inline">
                                <button className="flex inline-flex items-center px-4 font-bold cursor-pointer px-5 mx-2 py-3 inline text-sm font-medium text-center text-white rounded-lg bg-[#26B99A] hover:bg-green-800">
                                    Thêm phòng <BsFillPatchPlusFill size={15} className="inline ml-3" />
                                </button>
                            </li>
                            <li className="inline"
                                onClick={() => {
                                    setshowModalHouse(true)
                                    setstatusModalHouse(true)
                                }}>
                                <button className="flex inline-flex items-center px-4 font-bold cursor-pointer px-5 mx-2 py-3 inline text-sm font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-800">
                                    Thêm nhà <BsFillHouseAddFill size={15} className="inline ml-3" />
                                </button>
                            </li>
                            <li className="inline"
                                onClick={() => {
                                    setshowModalHouse(true)
                                    setstatusModalHouse(false)
                                }}>
                                <button className="font-bold cursor-pointer px-5 mx-2 py-3 inline text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-900">
                                    Sửa nhà <BsPencilSquare size={15} className="ml-1 inline" />
                                </button>
                            </li>
                            <li className="inline"
                                onClick={() => {
                                    setmessageDelete("Xóa nhà này sẽ xóa tất cả thông tin liên quan đến nhà này bạn có muốn tiếp tục ?")
                                    setshowModalDelete(true)
                                }}>
                                <button className="font-bold cursor-pointer px-5 mx-2 py-3 inline text-sm font-medium text-center text-white rounded-lg bg-[red] hover:bg-red-800">Xóa nhà <BsFillTrashFill size={15} className="ml-1 inline" /></button>
                            </li>
                        </ul>
                    </div>
                    <div className='flex justify-start px-10 mt-8'>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {houseData.map((el) => (
                                <Fragment key={el.houseId}>
                                    {el.houseId === CurentHouseSelected && el.rooms.map((r) => (
                                        <Fragment key={r.id}>
                                            <div className="flex flex-col max-w-sm p-5 bg-white border rounded-lg border-[#059669] shadow-md shadow-[#26B99A]">
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-black dark:text-black">phòng {r.numberRoom}</h5>
                                                <div className="text-black py-1">
                                                    <span className="font-bold px-2">Giá : </span> {r.price} <span className="font-bold">$</span>
                                                </div>
                                                <div className="text-black py-1">
                                                    <span className="font-bold px-2">Số người ở tối đa : </span> {r.stayMax}
                                                </div>
                                                <div className="text-black py-1">
                                                    <span className="font-bold px-2">Trạng thái : </span>  {r.emptyRoom != 1 ? (
                                                        <span className="text-[red]">Đã thuê</span>
                                                    ) : (
                                                        <span className="text-[green]">Chưa thuê</span>
                                                    )}
                                                </div>
                                                <button className="flex justify-between inline-flex items-center mt-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => {
                                                        setShowModalTenant(true)
                                                    }}>
                                                    Quản lý khách <BsFillPersonFill size={15} className="inline" />
                                                </button>
                                                <div className="flex">
                                                    <button className="mt-10 mr-3 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800"
                                                        onClick={() => {
                                                            setDataFromById(r.id)
                                                            setshowModalRoom(true)
                                                            setstatusModalRoom(false)
                                                        }}>
                                                        Sửa <BsPencilSquare size={15} className="ml-1 inline" />
                                                    </button>
                                                    <button className="mt-10 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[red] hover:bg-red-800"
                                                        onClick={() => {
                                                            setTypeDelete({
                                                                type: "room",
                                                                id: r.id
                                                            })
                                                            setmessageDelete("Bạn có chắc muốn xóa phòng này ?")
                                                            setshowModalDelete(true)
                                                        }}>
                                                        Xóa <BsFillTrashFill size={15} className="ml-1 inline" />
                                                    </button>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* room modal */}
            {showModalRoom ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative p-10 " style={{ width: '1000px' }}>
                            <div className="relative bg-white rounded-lg shadow shadow-black">
                                <div className="flex items-center justify-between py-5 mx-4 border-b border-[#0000002e] rounded-t">
                                    <h3 className="text-xl font-semibold text-black">
                                        {!statusModalRoom ? "Sửa thông tin phòng" : "Thêm phòng"}
                                    </h3>
                                    <button onClick={() => {
                                        setshowModalRoom(false)
                                    }} type="button" className="text-black bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                                    <div className="grid grid-rows- gap-4">
                                        <div className="grid grid-cols-5 gap-4">
                                            <div className="col-span-4">
                                                <label htmlFor="numberRoom" className="block mb-2 text-sm font-medium text-black">
                                                    Số phòng <span className="text-[#EF444A]">*</span>
                                                </label>
                                                <input type="text" name="numberRoom" id="numberRoom"
                                                    className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Nhập tên số phòng"
                                                    required="" value={form.numberRoom}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="houseId" className="block mb-2 text-sm font-medium text-black">Nhà <span className="text-[#EF444A]">*</span></label>
                                                <select id="houseId" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    name="houseId"
                                                    value={form.houseId}
                                                    onChange={handleInputChange}>
                                                    {houseData.map((house) => (
                                                        <Fragment key={house.houseId}>
                                                            <option value={house.houseId}>{house.houseName}</option>
                                                        </Fragment>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-5 gap-4">
                                            <div className="col-span-2">
                                                <label htmlFor="electricityPrice" className="block mb-2 text-sm font-medium text-black">Giá điện <span className="text-[#EF444A]">*</span></label>
                                                <input type="text" name="electricityPrice" id="electricityPrice" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Nhập giá điện"
                                                    required="" value={form.electricityPrice}
                                                    onChange={handleInputChange} />
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="waterPrice" className="block mb-2 text-sm font-medium text-black">Giá nước <span className="text-[#EF444A]">*</span></label>
                                                <input type="text" name="waterPrice" id="waterPrice" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Nhập giá nước"
                                                    required="" value={form.waterPrice}
                                                    onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="col-span-3">
                                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-black">Giá phòng <span className="text-[#EF444A]">*</span></label>
                                                <input type="number" name="price" id="price" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="$2999" required="" value={form.price}
                                                    onChange={handleInputChange} />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="stayMax" className="block mb-2 text-sm font-medium ttext-black">Số lượng max <span className="text-[#EF444A]">*</span></label>
                                                <input type="number" name="stayMax" id="stayMax" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Nhập số người ở tối đa" required="" value={form.stayMax}
                                                    onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4 ">
                                            <div className="col-span-1">
                                                <label htmlFor="acreage" className="block mb-2 text-sm font-medium text-black">Diện tích <span className="text-[#EF444A]">*</span></label>
                                                <input type="number" name="acreage" id="acreage" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Nhập diện tích (m²)" required="" value={form.acreage}
                                                    onChange={handleInputChange} />
                                            </div>

                                            <div className={statusModalRoom ? "col-start-4 pointer-events-none opacity-25" : "col-start-4"}>
                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">Trạng thái</label>
                                                <div className="flex items-center mb-4">
                                                    <input checked id="default-radio-1" type="radio" value="false" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-black">Chưa thuê</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="default-radio-2" type="radio" value="true" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-black">Đã thuê</label>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[#EF444A] text-sm">(*) Hạng mục bắt buộc</span>
                                    </div>
                                    {statusModalRoom ? (
                                        <button type="submit" className="mt-10 text-white inline-flex items-center bg-[#26B99A] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                            Thêm phòng
                                        </button>
                                    ) : (
                                        <button className="mt-10 text-white inline-flex items-center bg-[#26B99A] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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

            {/* house modal */}
            {showModalHouse ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative p-10 " style={{ width: '1000px' }}>
                            <div className="relative bg-white rounded-lg shadow shadow-black">
                                <div className="flex items-center justify-between py-5 mx-4 border-b border-[#0000002e] rounded-t">
                                    <h3 className="text-lg font-semibold text-black ">
                                        {!statusModalHouse ? "Sửa thông tin nhà" : "Thêm nhà"}
                                    </h3>
                                    <button onClick={() => {
                                        setshowModalHouse(false)
                                    }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>
                                <form action="#" className="p-4 md:p-5">
                                    <div className="grid grid-rows- gap-4">
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="col-span-2">
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-black ">Tên nhà <span className="text-[#EF444A]">*</span></label>
                                                <input type="text" name="name" id="name" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tên nhà" required="" />
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-black ">Thành phố <span className="text-[#EF444A]">*</span></label>
                                                <select id="category" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option value="TV">Hà Nội</option>
                                                    <option selected="TV">Đà Nẵng</option>
                                                    <option value="TV">TP. Hồ Chí Minh</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="col-span-2">
                                                <label htmlFor="district" className="block mb-2 text-sm font-medium text-black ">Quận / Huyện <span className="text-[#EF444A]">*</span> </label>
                                                <select id="district" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option selected="TV">Hải Châu</option>
                                                    <option value="TV">Cẩm Lệ</option>
                                                    <option value="TV">Thanh Khê</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="ward" className="block mb-2 text-sm font-medium text-black ">Phường <span className="text-[#EF444A]">*</span></label>
                                                <select id="ward" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option selected="TV">Hòa Thuận Đông</option>
                                                    <option value="TV">Hòa Thuận Tây</option>
                                                    <option value="TV">TP. Hồ Chí Minh</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="col-span-4">
                                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-black ">Địa chỉ <span className="text-[#EF444A]">*</span></label>
                                                <input type="text" name="address" id="address" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Nhập địa chỉ nhà"
                                                    required="" />
                                            </div>
                                        </div>
                                        <span className="text-[#EF444A] text-sm">(*) Hạng mục bắt buộc</span>
                                    </div>

                                    {statusModalHouse ? (
                                        <button type="submit" className="mt-10 text-white inline-flex items-center bg-[#26B99A] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                            Thêm nhà
                                        </button>
                                    ) : (
                                        <button type="submit" className="mt-10 text-white inline-flex items-center bg-[#26B99A] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            <BsPencilSquare size={15} className="mr-2 inline" /> Cập nhật thông tin nhà
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : null
            }

            {/* delete modal */}
            {showModalDelete ? (
                <DeleteConfirm message={messageDelete} onRegister={confirmDelete} type={typeDelete} />
            ) : null
            }

            {/* delete modal */}
            {showModalTenant ? (
                <>
                    <div id="default-modal" tabIndex="-1" aria-hidden="true"
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative p-4">
                            {/* <!-- Modal content --> */}
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* <!-- Modal header --> */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Quản lý người ở
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal"
                                        onClick={() => {
                                            setShowModalTenant(false)
                                        }}>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <div className="p-4 md:p-5 space-y-4">
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                                    </p>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                                    <button data-modal-hide="default-modal" type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null
            }
        </>
    )
}

export default ManagerHouse
