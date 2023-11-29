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
