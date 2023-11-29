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
export const apiGetDetailPost = (params) =>
  axios({
    url: "/guest/postDetail",
    method: "get",
    params,
  })
export const apiRatings = (data) =>
  axios({
    url: "/rating/new",
    method: "post",
    data,
  })
export const apiGetRatings = (params) =>
  axios({
    url: "/rating/list/group",
    method: "get",
    params,
  })
