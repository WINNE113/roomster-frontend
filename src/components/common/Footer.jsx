import { menu } from "@/ultils/constant"
import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  console.log(menu)
  return (
    <div className="bg-emerald-700 text-white p-6">
      <div className="w-main mx-auto grid grid-cols-5 gap-4">
        <div className="col-span-1 flex justify-center items-center">
        <span className="text-3xl font-bold tracking-tight">
            troyutin.com
          </span>
        </div>
        <div className="col-span-1 py-6 flex flex-col gap-1">
          <h1 className="uppercase font-bold pb-2">về chúng tôi</h1>
          <Link to={"/"} className="hover:underline">
            Quy chế hoạt động
          </Link>
          <Link to={"/"} className="hover:underline">
            Chính sách bảo mật
          </Link>
          <Link to={"/"} className="hover:underline">
            Giải quyết khiếu nại
          </Link>
          <Link to={"/"} className="hover:underline">
            Điều khoản & cam kết
          </Link>
        </div>
        <div className="col-span-1 py-6 flex flex-col gap-1">
          <h1 className="uppercase font-bold pb-2">hệ thống</h1>
          {menu.map((el) => (
            <Link to={el.path} className="hover:underline">
              {el.subname}
            </Link>
          ))}
        </div>
        <div className="col-span-1 py-6 flex flex-col gap-1">
          <h1 className="uppercase font-bold pb-2">liên kết dịch vụ</h1>
          <Link to={"/"} className="hover:underline">
            Phòng khám tốt
          </Link>
          <Link to={"/"} className="hover:underline">
            Mặt bằng mới
          </Link>
          <Link to={"/"} className="hover:underline">
            Nhà, đất, căn hộ chung cư
          </Link>
        </div>
        <div className="col-span-1 py-6 flex flex-col gap-1">
          <h1 className="uppercase font-bold pb-2">kết nối với chúng tôi</h1>
          <span className="hover:underline">
            Hotline: <a href="tel:0813558768">0813558768</a>
          </span>
          <span className="hover:underline">
            Email: <a href="mailto:trouytin@gmail.com">trouytin@gmail.com</a>
          </span>
          <span className="flex items-center gap-2 my-2">
            <a href="https://www.facebook.com/profile.php?id=61553932246952">
              <img
                src="/fb.svg"
                alt="https://www.facebook.com/profile.php?id=61553932246952"
                className="w-10 h-10 object-cover border rounded-full"
              />
            </a>
            <a href="https://www.youtube.com/@TroUyTin">
              <img
                src="/yt.svg"
                alt="https://www.youtube.com/@TroUyTin"
                className="w-10 h-10 object-cover border rounded-full"
              />
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer