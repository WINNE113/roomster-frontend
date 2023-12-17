import axios from "@/axios"

export const getOrderHouse = () =>
  axios({
    url: "/api/v1/room-master/order",
    method: "get",
  })
export const getOrderHouseById = (id) =>
  axios({
    url: `/api/v1/room-master/order/${id}`,
    method: "get",
  })
export const addOrderHouse = (data) =>
  axios({
    method: "post",
    url: `/api/v1/room-master/order`,
    data,
  })
export const updateOrderHouse = (id, data) =>
  axios({
    method: "put",
    url: `/api/v1/room-master/order/${id}`,
    data,
  })
export const deleteOrderHouse = (id) =>
  axios({
    url: `http://localhost:8080/room-master/order/${id}`,
    method: "delete",
  })
