import instance from "@/axios"

export const getListHouse = () =>
  instance({
    url: "http://localhost:8080/room-master/house",
    method: "get",
  })
export const getHouseById = (id) =>
  instance({
    url: `http://localhost:8080/room-master/house/${id}`,
    method: "get",
  })
export const addHouse = (data) =>
  instance({
    method: "post",
    url: `http://localhost:8080/room-master/house`,
    data,
  })
export const updateHouse = (id, data) =>
  instance({
    method: "put",
    url: `http://localhost:8080/room-master/house/${id}`,
    data,
  })
export const deleteHouse = (id) =>
  instance({
    url: `http://localhost:8080/room-master/house/${id}`,
    method: "delete",
})
