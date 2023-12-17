import axios from "@/axios"

export const getListTenant = () =>
  axios({
    url: "/api/v1/room-master/tenant",
    method: "get",
  })

export const getTenantById = (id) =>
  axios({
    url: `/api/v1/room-master/tenant/${id}`,
    method: "get",
  })
  export const getTenantByRoomId = (id) =>
  axios({
    url: `/api/v1/room-master/tenant/room/${id}`,
    method: "get",
  })
  
export const addTenant = (data) =>
  axios({
    method: "post",
    url: `/api/v1/room-master/tenant`,
    data,
  })
export const updateTenant = (id, data) =>
  axios({
    method: "put",
    url: `/api/v1/room-master/tenant/${id}`,
    data,
  })
  export const moveTenant = (id, data) =>
  axios({
    method: "put",
    url: `/api/v1/room-master/tenant/move/${id}`,
    data,
  })
export const deleteTenant = (listIds) =>
  axios({
    url: `/api/v1/room-master/tenant`,
    method: "delete",
    data: listIds,
  })
