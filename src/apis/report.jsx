import axios from "@/axios"

export const apiAddReport = (data) =>
  axios({
    url: "/api/v1/guest/report/add",
    method: "post",
    data,
  })
export const apiGetReports = (params) =>
  axios({
    url: "/api/v1/admin/report/getAll",
    method: "get",
    params,
  })