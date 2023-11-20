import axios from "@/axios"

export const apiCreateNewPost = (data) =>
  axios({
    url: "/post/new",
    method: "post",
    data,
  })
export const apiGetPosts = (data) =>
  axios({
    url: "/guest/post/filters",
    method: "post",
    data,
  })
export const apiGetPostsByRating = (params) =>
  axios({
    url: "/guest/list-post-by-rating",
    method: "get",
    params,
  })
