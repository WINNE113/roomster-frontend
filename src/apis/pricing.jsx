import axios from "@/axios"

export const apiCreatePricing = (data) =>
  axios({
    url: "/api/v1/admin/service/add-service-package",
    method: "post",
    data,
  })
export const apiGetPricings = (params) =>
  axios({
    url: "/api/v1/guest/service/service-package",
    method: "get",
    params,
  })
export const apiUpdatePricing = (data, id) =>
  axios({
    url: "/api/v1/admin/service/update-service-package/" + id,
    method: "put",
    data,
  })
export const apiDeletePricing = (id) =>
  axios({
    url: "/api/v1/admin/service/delete-service-package/" + id,
    method: "delete",
  })
export const apiSubcribePricing = (params) =>
  axios({
    url: "/api/v1/user/service/purchasePackageByUser",
    method: "post",
    params,
  })
