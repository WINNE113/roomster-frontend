import axios from "axios"

export const apiGetProvinces = () =>
  axios({
    url: "https://provinces.open-api.vn/api/p/",
    method: "get",
  })
export const apiGetProvince = (provinceCode) =>
  axios({
    url: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=3`,
    method: "get",
  })
export const apiUploadImageCloudinary = (data) =>
  instance({
    method: "post",
    url: `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/image/upload`,
    data,
  })
export const apiGetLngLatFromAddress = (params) =>
  instance({
    method: "get",
    url: `https://api.geoapify.com/v1/geocode/search`,
    params,
  })
