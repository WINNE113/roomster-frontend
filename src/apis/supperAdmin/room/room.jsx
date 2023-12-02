import instance from "@/axios"

export const getListHouse = () =>
    instance({
        url: "http://localhost:8080/room-master/house",
        method: "get",
    })
export const getHouseById = (id) =>
    instance({
        url: `http://localhost:8080/room-master/room/${id}`,
        method: "get",
    })
export const addRoom = (data) =>
    instance({
        method: "post",
        url: `http://localhost:8080/room-master/room`,
        data,
    })
export const updateHouse = (id, data) =>
    instance({
        method: "put",
        url: `http://localhost:8080/room-master/house/${id}`,
        data,
    })
export const deleteHouse = (id) =>
    instance({
        url: `http://localhost:8080/room-master/house/${id}`,
        method: "delete",
    })
