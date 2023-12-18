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
