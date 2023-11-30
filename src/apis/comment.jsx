import axios from "@/axios"

export const apiCreateNewComment = (data) =>
  axios({
    url: "/comment/new",
    method: "post",
    data,
  })

export const apiGetComments = (pid) =>
  axios({
    url: "/comment/list/" + pid,
    method: "get",
  })
  export const apiUpdateComment = (data) =>
  axios({
    url: "/comment/update",
    method: "put",
    data,
  })
export const apiDeleteComment = (params) =>
  axios({
    url: "/comment/delete",
    method: "delete",
    params,
  })
