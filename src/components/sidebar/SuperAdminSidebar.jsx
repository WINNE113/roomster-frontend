import withBaseTopping from "@/hocs/WithBaseTopping"
import { logout } from "@/redux/userSlice"
import { superAdminSidebar } from "@/ultils/constant"
import path from "@/ultils/path"
import { formatMoney } from "@/ultils/fn"
import clsx from "clsx"
import React, { Fragment, useState } from "react"
import {
    AiFillCaretRight,
    AiFillCaretDown,
    AiOutlineLogout,
} from "react-icons/ai"
import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

const SuperAdminSidebar = ({ dispatch }) => {
    const navigate = useNavigate();
    const [tabs, setTabs] = useState([])
    const { current } = useSelector((state) => state.user)
    const handleTabs = (tabId) => {
        if (tabs.some((el) => el === tabId))
            setTabs((prev) => prev.filter((el) => el !== tabId))
        else setTabs((prev) => [...prev, tabId])
    }
    return (
        <div className="w-full min-h-screen">
            <div className="py-12 pb-6 flex flex-col gap-1 justify-center items-center w-full">
                {/* <img src="/logo.png" alt="" className="w-3/5 object-contain" /> */}
                <span className="text-3xl text-emerald-600 tracking-tight font-bold">
                    Tromoi.com
                </span>
                <small className="text-sm font-medium text-red-500 ">
                    Quản lý trọ
                </small>
                <div className="mt-4 flex flex-col items-center justify-center gap-1">
                    <img
                        src={current?.images || "/user.svg"}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <span className="text-main-red font-bold">{current?.userName}</span>
                    <span>{"Mã thành viên: #" + current?.userId}</span>
                    <span>{`TK chính: ${formatMoney(+current?.balance)} VND`}</span>
                </div>
            </div>
            <div>
                {superAdminSidebar.map((el) => (
                    <Fragment key={el.id}>
                        {el.type === "SINGLE" && (
                            <NavLink
                                className={({ isActive }) =>
                                    clsx(
                                        "flex hover:bg-blue-100 w-full  p-3 items-center gap-2",
                                        isActive && "text-main-blue font-bold bg-blue-100"
                                    )
                                }
                                to={el.path}
                            >
                                {el.icon}
                                {el.name}
                            </NavLink>
                        )}
                        {el.type === "PARENT" && (
                            <div className="flex flex-col" to={el.path}>
                                <div
                                    onClick={() => handleTabs(el.id)}
                                    className={clsx(
                                        "flex justify-between p-3 cursor-pointer items-center",
                                        tabs.some((t) => t === el.id) && "text-main-600 font-bold"
                                    )}
                                >
                                    <span className="flex gap-2  items-center">
                                        {el.icon}
                                        {el.name}
                                    </span>
                                    {tabs.some((t) => t === el.id) ? (
                                        <AiFillCaretDown />
                                    ) : (
                                        <AiFillCaretRight />
                                    )}
                                </div>
                                {tabs.some((t) => t === el.id) &&
                                    el.subs.map((item) => (
                                        <NavLink
                                            key={item.path}
                                            className={({ isActive }) =>
                                                clsx(
                                                    "flex pl-8 hover:bg-blue-100 w-full  p-3 items-center gap-2",
                                                    isActive && "text-main-blue font-bold bg-blue-100"
                                                )
                                            }
                                            to={item.path}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                            </div>
                        )}
                    </Fragment>
                ))}
                <span
                    onClick={() => {
                        dispatch(logout())
                        navigate(`/${path.LOGIN}`)
                    }}
                    className={clsx(
                        "flex cursor-pointer hover:bg-blue-100 w-full p-3 items-center gap-2"
                    )}
                >
                    <AiOutlineLogout size={20} />
                    <span>Đăng xuất</span>
                </span>
            </div>
        </div>
    )
}

export default withBaseTopping(SuperAdminSidebar)
