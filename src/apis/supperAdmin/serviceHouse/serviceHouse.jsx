import instance from "@/axios"

export const getServiceHouse = () =>
  instance({
    url: "/api/v1/room-master/serviceHouse",
    method: "get",
  })
export const getServiceHouseById = (id) =>
  instance({
    url: `/api/v1/room-master/serviceHouse/${id}`,
    method: "get",
  })
export const addServiceHouse = (data) =>
  instance({
    method: "post",
    url: `/api/v1/room-master/serviceHouse`,
    data,
  })
export const updateServiceHouse = (id, data) =>
  instance({
    method: "put",
    url: `/api/v1/room-master/serviceHouse/${id}`,
    data,
  })
  export const updateServiceRoom = (id, data) =>
  instance({
    method: "put",
    url: `/api/v1/room-master/serviceHouse/room-service/${id}`,
    data,
  })
  
export const deleteServiceHouse = (datalist) =>
  instance({
    url: `/api/v1/room-master/serviceHouse`,
    method: "delete",
    data: datalist,
})
