import axios from "@/axios"

export const apiCreateNewComment = (data) =>
  axios({
    url: "/api/v1/comment/new",
    method: "post",
    data,
  })

export const apiGetComments = (pid) =>
  axios({
    url: "/api/v1/comment/list/" + pid,
    method: "get",
  })
export const apiUpdateComment = (data, id) =>
  axios({
    url: "/api/v1/comment/update",
    method: "put",
    data,
    params: { commentId: id },
  })
export const apiDeleteComment = (params) =>
  axios({
    url: "/api/v1/comment/delete",
    method: "delete",
    params,
  })
