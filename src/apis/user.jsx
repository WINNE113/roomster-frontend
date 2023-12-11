import axios from "@/axios"

export const apiRegister = (data) =>
  axios({
    url: "/api/v1/auth/registration",
    method: "post",
    data,
  })
export const apiVerifyOtp = (data) =>
  axios({
    url: "/api/v1/auth/verification-otp",
    method: "post",
    data,
  })
export const apiLogin = (data) =>
  axios({
    url: "/api/v1/auth/authenticate",
    method: "post",
    data,
  })
export const apiGetCurrent = () =>
  axios({
    url: "/api/v1/user/view-profile",
    method: "get",
  })
export const apiUpdateProfile = (data) =>
  axios({
    url: "/api/v1/user/update-profile",
    method: "post",
    data,
  })
export const apiAddWishlist = (params) =>
  axios({
    url: "/api/v1/wishlist/add",
    method: "post",
    params,
  })
export const apiGetWishlist = (params) =>
  axios({
    url: "/api/v1/wishlist/get",
    method: "get",
    params,
  })
export const apiRemoveWishlist = (id) =>
  axios({
    url: "/api/v1/wishlist/delete/wishListItem/" + id,
    method: "delete",
  })
  export const apiVerifyRole = (data) =>
  axios({
    url: "/api/v1/user/sendOTP",
    method: "post",
    data,
  })
export const apiUpgradeRole = (data) =>
  axios({
    url: "/api/v1/user/up-to-role-manage",
    method: "post",
    data,
  })
  export const apiChangePhone = (data) =>
  axios({
    url: "/api/v1/user/update-phonenumber",
    method: "post",
    data,
  })
export const apiChangePassword = (data) =>
  axios({
    url: "/api/v1/user/update-password",
    method: "patch",
    data,
  })
