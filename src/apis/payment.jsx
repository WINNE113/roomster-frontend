import axios from "@/axios"

export const apiPayment = (data) =>
  axios({
    url: "/payment",
    method: "post",
    data,
  })
export const apiGetDepositHistory = (params) =>
  axios({
    url: "/payment/history",
    method: "get",
    params,
  })
export const apiGetTransationUser = (params) =>
  axios({
    url: "/user/transaction/service-package",
    method: "get",
    params,
  })
export const apiGetTransationAdmin = (params) =>
  axios({
    url: "/admin/transaction/service-package",
    method: "get",
    params,
  })
