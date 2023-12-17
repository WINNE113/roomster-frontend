import axios from "@/axios"

export const getListHouse = () =>
axios({
    url: '/api/v1/room-master/house',
    method: "get",
  })

export const getHouseById = (id) =>
axios({
    url: `/api/v1/room-master/house/${id}`,
    method: "get",
  })

  export const getHouseBySearchCondition = (condition) =>
  axios({
    url: `/api/v1/room-master/house${condition ? `?${condition}` : ''}`,
    method: "get",
  })
export const addHouse = (data) =>
  axios({
    method: "post",
    url: `/api/v1/room-master/house`,
    data,
  })
export const updateHouse = (id, data) =>
  axios({
    method: "put",
    url: `/api/v1/room-master/house/${id}`,
    data,
  })
export const deleteHouse = (id) =>
axios({
    url: `/api/v1/room-master/house/${id}`,
    method: "delete",
})
