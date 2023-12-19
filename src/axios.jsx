import axios from "axios"
const instance = axios.create({
  baseURL: "https://nhatro-spring-app-20231220005522.azuremicroservices.io/api/v1",
})
instance.interceptors.request.use(
  function (config) {
    const data = window.localStorage.getItem("persist:trouytin")
    const tokenObj = data && JSON.parse(data)
    if (tokenObj?.token?.length > 6)
      config.headers = {
        authorization: `Bearer ${JSON.parse(tokenObj.token)}`,
      }
    return config
  },
  function (error) {
    return error
  }
)

instance.interceptors.response.use(
  function (response) {
    return response?.data
  },
  function (error) {
    return error.response?.data
  }
)

export default instance
