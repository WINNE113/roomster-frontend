import axios from "@/axios"

export const apiPayment = (data) =>
  axios({
    url: "/api/v1/payment",
    method: "post",
    data,
  })
export const apiGetDepositHistory = (params) =>
  axios({
    url: "/api/v1/payment/history",
    method: "get",
    params,
  })
