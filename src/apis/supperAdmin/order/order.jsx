import instance from "@/axios"

export const getOrderHouse = () =>
  instance({
    url: "http://localhost:8080/room-master/order",
    method: "get",
  })
export const getOrderHouseById = (id) =>
  instance({
    url: `http://localhost:8080/room-master/order/${id}`,
    method: "get",
  })
export const addOrderHouse = (data) =>
  instance({
    method: "post",
    url: `http://localhost:8080/room-master/order`,
    data,
  })
export const updateOrderHouse = (id, data) =>
  instance({
    method: "put",
    url: `http://localhost:8080/room-master/order/${id}`,
    data,
  })
export const deleteOrderHouse = (id) =>
  instance({
    url: `http://localhost:8080/room-master/order/${id}`,
    method: "delete",
})
