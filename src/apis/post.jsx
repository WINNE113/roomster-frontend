import axios from "@/axios"

export const apiCreateNewPost = (data) =>
  axios({
    url: "/api/v1/post/new",
    method: "post",
    data,
  })
export const apiGetPosts = (data) =>
  axios({
    url: "/api/v1/guest/post/filters",
    method: "post",
    data,
  })
export const apiGetPostsByRating = (params) =>
  axios({
    url: "/api/v1/guest/list-post-by-rating",
    method: "get",
    params,
  })
export const apiGetDetailPost = (params) =>
  axios({
    url: "/api/v1/guest/postDetail",
    method: "get",
    params,
  })
export const apiRatings = (data) =>
  axios({
    url: "/api/v1/rating/new",
    method: "post",
    data,
  })
export const apiGetRatings = (params) =>
  axios({
    url: "/api/v1/rating/list/group",
    method: "get",
    params,
  })
export const apiDeletePost = (params) =>
  axios({
    url: "/api/v1/post/delete",
    method: "delete",
    params,
  })
export const apiUpdateApprovedPost = (params) =>
  axios({
    url: "/api/v1/admin/setIsApprovedPost",
    method: "patch",
    params,
  })
export const apiUpdateRejectedPost = (params) =>
  axios({
    url: "/api/v1/admin/setIsRejectedPost",
    method: "patch",
    params,
  })

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