import axios from "@/axios"

export const getCities = () =>
  axios({
    url: "/api/v1/common/city",
    method: "get",
  })

export const getDistrictesByCityId = (id) =>
  axios({
    url: `/api/v1/common/district?id_city=${id}`,
    method: "get",
  })

export const getWardesByDistrictId = (id) =>
  axios({
    url: `/api/v1/common/ward?id_district=${id}`,
    method: "get",
  })

