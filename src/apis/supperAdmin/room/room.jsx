import instance from "@/axios"

export const getListRoom = () =>
    instance({
        url: "/api/v1/room-master/room",
        method: "get",
    })
export const getRoomById = (id) =>
    instance({
        url: `/api/v1/room-master/room/${id}`,
        method: "get",
    })
export const addRoom = (data) =>
    instance({
        method: "post",
        url: `/api/v1/room-master/room`,
        data,
    })
export const updateRoom = (id, data) =>
    instance({
        method: "put",
        url: `/api/v1/room-master/house/${id}`,
        data,
    })
export const deleteRoom = (id) =>
    instance({
        url: `/api/v1/room-master/house/${id}`,
        method: "delete",
    })
