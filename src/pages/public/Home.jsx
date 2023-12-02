import { apiGetPosts, apiGetPostsByRating } from "@/apis/post"
import {
  BoxFilter,
  Card,
  Header,
  LongCard,
  Search,
  Section,
} from "@/components"
import { cities, menu } from "@/ultils/constant"
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

const Home = () => {
  const [posts, setPosts] = useState()
  const [ratings, setRatings] = useState()
  const fetchHomeData = async () => {
    const formdata = new FormData()
    formdata.append("json", JSON.stringify({ status: "APPROVED" }))
    formdata.append("size", 5)
    const response = await apiGetPosts(formdata)
    if (response?.data) setPosts(response.data)
  }
  const fetchHomeRatings = async () => {
    const formdata = new FormData()
    const response = await apiGetPostsByRating({ size: 10 })
    if (response) setRatings(response)
  }
  useEffect(() => {
    fetchHomeRatings()
    fetchHomeData()
  }, [])
  return (
    <section className="pb-16">
      <Header />
      <Search />
      <Section
        className="w-main mx-auto"
        title="LỰA CHỌN NỔI BẬT"
        contentClassName="grid grid-cols-4 gap-4"
      >
        {ratings?.map((el) => (
          <Card {...el} key={el.id} />
        ))}
      </Section>
      <Section
        className="w-main mt-12 mx-auto"
        title="TỈNH / THÀNH PHỐ NỔI BẬT"
        contentClassName="grid grid-cols-4 gap-4"
      >
        {cities.map((el) => (
          <div key={el.name} className="col-span-1 w-full h-fit relative">
            <img
              src={el.image}
              alt=""
              className="w-full h-[375px] object-cover rounded-md"
            />
            <div className="absolute inset-0 flex items-end">
              <div className="w-full h-1/2 bg-gradient-to-t flex flex-col justify-end p-4 text-white from-[rgba(0,0,0,0.7)] to-transparent">
                <h3 className="font-semibold text-xl">{el.name}</h3>
                <span>{el.postCounter + " tin đăng"}</span>
              </div>
            </div>
          </div>
        ))}
      </Section>
      <Section
        className="w-main mt-12 mx-auto"
        title="LỰA CHỌN HOT"
        contentClassName="grid grid-cols-10 gap-4"
      >
        <div className="col-span-7 flex flex-col gap-4">
          {posts?.map((el) => (
            <LongCard key={el.id} {...el} />
          ))}
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <BoxFilter
            className="flex justify-center items-center text-xl font-semibold"
            title="LOẠI HÌNH"
            containerClassName="bg-white border"
          >
            <div className="p-4 flex flex-col text-gray-700 gap-3 text-base">
              {menu.map((el) => (
                <NavLink
                  to={el.path}
                  key={el.id}
                  className="border-b capitalize"
                >
                  <span>
                    {el.name}{" "}
                    <span className="text-sm font-normal">{`(1254)`}</span>
                  </span>
                </NavLink>
              ))}
            </div>
          </BoxFilter>
          <BoxFilter
            className="flex justify-center items-center text-xl font-semibold"
            title="DANH SÁCH TRỌ MỚI"
            containerClassName="bg-white w-full"
          >
            {posts
              ?.filter((el, idx) => idx < 4)
              ?.map((el) => (
                <LongCard
                  containerClassName="rounded-none border-b w-full"
                  hideImage
                  key={el.id}
                  {...el}
                />
              ))}
          </BoxFilter>
        </div>
      </Section>
    </section>
  )
}

export default Home
