import ManageSider from "@/components/sidebar/ManageSider"
import withBaseTopping from "@/hocs/WithBaseTopping"
import path from "@/ultils/path"
import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const LayoutManager = () => {
  const { current } = useSelector((state) => state.user)
  if (!current?.roleList?.some((el) => el.name === "ROLE_MANAGE"))
    return <Navigate to={`/${path.LOGIN}`} />
  return (
    <div className="grid grid-cols-11 bg-gray-100 gap-3 overflow-hidden max-h-screen">
      <div className="col-span-2 bg-white max-h-full overflow-y-auto">
        <ManageSider />
      </div>
      <div className="col-span-9 bg-white max-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default withBaseTopping(LayoutManager)
