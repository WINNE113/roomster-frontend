import axios from "@/axios"

export const apiRegister = (data) =>
  axios({
    url: "/auth/registration",
    method: "post",
    data,
  })
export const apiVerifyOtp = (data) =>
  axios({
    url: "/auth/verification-otp",
    method: "post",
    data,
  })
export const apiLogin = (data) =>
  axios({
    url: "/auth/authenticate",
    method: "post",
    data,
  })
export const apiGetCurrent = () =>
  axios({
    url: "/user/view-profile",
    method: "get",
  })
export const apiUpdateProfile = (data) =>
  axios({
    url: "/user/update-profile",
    method: "post",
    data,
  })
