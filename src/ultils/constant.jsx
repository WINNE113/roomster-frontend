import { BsFilePerson, BsPostcard } from "react-icons/bs"
import {
  AiFillDashboard,
  AiOutlineDashboard,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai"
import path from "./path"
import { FcUpRight } from "react-icons/fc"
import { MdOutlineAttachMoney } from "react-icons/md"
import { RiShareForwardFill } from "react-icons/ri"

export const menu = [
  {
    path: "/danh-sach/?type=" + path.PHONGTRO,
    name: "PHÒNG TRỌ",
    id: "phongtro",
  },
  {
    path: "/danh-sach/?type=cho-thue-nha-can-ho" + path.CANHO,
    name: "NHÀ, CĂN HỘ CHO THUÊ",
    id: "nhacanhochothue",
  },
  {
    path: "/danh-sach/?type=tim-o-ghep" + path.TIMOGHEP,
    name: "TÌM Ở GHÉP",
    id: "timoghep",
  },
  {
    path: "/" + path.BLOG,
    name: "BLOG",
    id: "blog",
  },
  {
    path: "/" + path.GUIDE,
    name: "HƯỚNG DẪN",
    id: "huongdan",
  },
]
export const distances = [
  {
    label: "Dưới 500m",
    name: "Dưới 500m",
    value: [0, 500],
  },
  {
    label: "Từ 500m - 1km",
    name: "Từ 500m - 1km",
    value: [500, 1000],
  },
  {
    label: "Từ 1km - 3km",
    name: "Từ 1km - 3km",
    value: [1000, 3000],
  },
  {
    label: "Từ 3km - 5km",
    name: "Từ 3km - 5km",
    value: [3000, 5000],
  },
  {
    label: "Trên 5km",
    name: "Trên 5km",
    value: [5000, 99999999],
  },
]
export const priceOptions = [
  {
    value: "Dưới 1 triệu",
    min: 0,
    max: 999999,
    type: "PRICE",
  },
  {
    value: "Từ 1 - 2 triệu",
    min: 1000000,
    max: 2000000,
    type: "PRICE",
  },
  {
    value: "Từ 2 - 3 triệu",
    min: 2000000,
    max: 3000000,
    type: "PRICE",
  },
  {
    value: "Từ 3 - 5 triệu",
    min: 3000000,
    max: 5000000,
    type: "PRICE",
  },
  {
    value: "Từ 5 - 7 triệu",
    min: 5000000,
    max: 7000000,
    type: "PRICE",
  },
  {
    value: "Từ 7 - 10 triệu",
    min: 7000000,
    max: 10000000,
    type: "PRICE",
  },
  {
    value: "Từ 10 - 15 triệu",
    min: 10000000,
    max: 15000000,
    type: "PRICE",
  },
  {
    value: "Trên 15 triệu",
    min: 15000000,
    max: 999999999999,
    type: "PRICE",
  },
]
export const areaOptions = [
  {
    value: "Dưới 20 m²",
    min: 0,
    max: 19.99,
    type: "AREA",
  },
  {
    value: "Từ 20 - 30 m²",
    min: 20,
    max: 30,
    type: "AREA",
  },
  {
    value: "Từ 30 - 50 m²",
    min: 30,
    max: 50,
    type: "AREA",
  },
  {
    value: "Từ 50 - 70 m²",
    min: 50,
    max: 70,
    type: "AREA",
  },
  {
    value: "Từ 70 - 90 m²",
    min: 70,
    max: 90,
    type: "AREA",
  },
  {
    value: "Trên 90 m²",
    min: 90.01,
    max: 999999999999,
    type: "AREA",
  },
]
export const targets = [
  {
    value: "1",
    name: "Nam",
    label: "Nam",
  },
  {
    value: "2",
    name: "Nữ",
    label: "Nữ",
  },
  {
    value: "0",
    name: "Tất cả",
    label: "Tất cả",
  },
]
export const managerSidebar = [
  {
    id: 1,
    name: "Thông tin cá nhân",
    path: `/${path.MANAGER}/${path.PERSONAL}`,
    icon: <BsFilePerson size={20} />,
    type: "SINGLE",
  },
  {
    id: 3,
    name: "Tin đăng",
    icon: <BsPostcard size={20} />,
    type: "PARENT",
    subs: [
      {
        path: `/${path.MANAGER}/${path.CREATE_POST}`,
        name: "Tạo mới",
      },
      {
        path: `/${path.MANAGER}/${path.MANAGE_POST}`,
        name: "Quản lý",
      },
    ],
  },
  {
    id: 2,
    name: "Tới Homepage",
    path: `/`,
    icon: <RiShareForwardFill size={20} />,
    type: "SINGLE",
  },
]
export const adminSidebar = [
  {
    id: 5,
    name: "Thống kê",
    path: `${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard size={20} />,
    type: "SINGLE",
  },
  {
    id: 3,
    name: "Quản lý tin đăng",
    icon: <BsPostcard size={20} />,
    type: "SINGLE",
    path: `${path.ADMIN}/${path.MANAGE_POST_ALL}`,
  },
  {
    id: 4,
    name: "Quản lý thành viên",
    path: `${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <AiOutlineUser size={20} />,
    type: "SINGLE",
  },
  // {
  //   id: 8,
  //   name: "Quản lý gia hạn",
  //   path: `${path.ADMIN}/${path.MANAGE_EXPIRED}`,
  //   icon: <MdOutlineAttachMoney size={20} />,
  //   type: "SINGLE",
  // },
  {
    id: 2,
    name: "Tới Homepage",
    path: `/`,
    icon: <RiShareForwardFill size={20} />,
    type: "SINGLE",
  },
]
export const memberSidebar = [
  {
    id: 1,
    name: "Thông tin cá nhân",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <BsFilePerson size={20} />,
    type: "SINGLE",
  },
  {
    id: 3,
    name: "Danh sánh yêu thích",
    path: `/${path.MANAGER}/${path.WISHLIST}`,
    icon: <AiOutlineHeart size={20} />,
    type: "SINGLE",
  },
  {
    id: 2,
    name: "Tới Homepage",
    path: `/`,
    icon: <RiShareForwardFill size={20} />,
    type: "SINGLE",
  },
]
