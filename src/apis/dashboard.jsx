
import axios from "@/axios"

export const apiTransactionStatus = () =>
    axios({
        url: "/api/v1/admin/transaction/status",
        method: "get",
    })

export const apiPostStatus = () =>
    axios({
        url: "/api/v1/admin/post/status",
        method: "get",
    })

export const apiPaymentTransactionStatus = () =>
    axios({
        url: "/api/v1/admin/payment/status",
        method: "get",
    })


export const apiUserStatus = () =>
    axios({
        url: "/api/v1/admin/user/status",
        method: "get",
    })