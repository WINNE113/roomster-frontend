import axios from "@/axios"

export const getHouseStatus = () =>
    axios({
        url: "/api/vi/room-master/house/status",
        method: "get",
    })
export const getRoomStatus = () =>
    axios({
        url: `/api/vi/room-master/room/status`,
        method: "get",
    })
export const getRoomStatusPayment = () =>
    axios({
        url: `/api/vi/room-master/room/statusPayment`,
        method: "get",
    })
export const getOrderStatus = () =>
    axios({
        url: `/api/vi/room-master/order/status`,
        method: "get",
    })