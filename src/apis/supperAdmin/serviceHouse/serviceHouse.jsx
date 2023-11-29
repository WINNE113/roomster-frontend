import instance from "@/axios"

export const getServiceHouse = () =>
  instance({
    url: "http://localhost:8080/room-master/serviceHouse",
    method: "get",
  })
export const getServiceHouseById = (id) =>
  instance({
    url: `http://localhost:8080/room-master/serviceHouse/${id}`,
    method: "get",
  })
export const addServiceHouse = (data) =>
  instance({
    method: "post",
    url: `http://localhost:8080/room-master/serviceHouse`,
    data,
  })
export const updateServiceHouse = (id, data) =>
  instance({
    method: "put",
    url: `http://localhost:8080/room-master/serviceHouse/${id}`,
    data,
  })
export const deleteServiceHouse = (id) =>
  instance({
    url: `http://localhost:8080/room-master/serviceHouse/${id}`,
    method: "delete",
})
