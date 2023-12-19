import axios from "@/axios"

export const apiAddReport = (data) =>
  axios({
    url: "/guest/report/add",
    method: "post",
    data,
  })
export const apiGetReports = (params) =>
  axios({
    url: "/admin/report/getAll",
    method: "get",
    params,
  })
