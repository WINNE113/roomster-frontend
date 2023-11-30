import { formatMoney, formatVietnameseToString } from "@/ultils/fn"
import path from "@/ultils/path"
import moment from "moment"
import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const Card = ({ image, title, address, price, createdDate, id }) => {
  return (
    <div className="w-full col-span-1 flex flex-col rounded-md border">
      <img
        src={image}
        alt="avatar"
        className="w-full h-[156px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="p-3 flex flex-col gap-1">
      <span className="text-sm text-gray-500">
          {address?.split(",")[address?.split(",")?.length - 1]}
        </span>
        <Link
          to={`/${path.DETAIL_POST}/${id}/${formatVietnameseToString(title)}`}
          className="text-emerald-800 text-lg cursor-pointer hover:underline font-semibold line-clamp-2"
        >
          {title}
        </Link>
        <span className="text-sm text-gray-500">{address}</span>
        <div className="mt-3 flex justify-between items-center">
          <span className="font-medium text-main-orange">{`${formatMoney(
            price
          )} VNĐ`}</span>
          <span className="text-gray-500 text-sm">
            {moment(createdDate).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
