import { AiFillStar, AiOutlineStar } from "react-icons/ai"

export const generateRange = (start, end) => {
  const length = end + 1 - start
  return Array.from({ length }, (_, index) => start + index)
}

export const formatMoney = (number) =>
  Number(number.toFixed(1)).toLocaleString()
export const customMoney = (number) => {
  if (typeof number !== "number") return
  const unit = number >= 1000000 ? "triệu/tháng" : "đồng/tháng"
  let output = number
  if (number >= 1000000) output = Math.round(number / 100000) / 10
  return formatMoney(output) + " " + unit
}
export const renderStarFromNumber = (number = 0, size = 16) => {
  if (!Number(number)) return
  const stars = []
  number = Math.round(number)
  for (let i = 0; i < +number; i++)
    stars.push(<AiFillStar color="orange" size={size} />)
  for (let i = 5; i > +number; i--)
    stars.push(<AiOutlineStar color="orange" size={size} />)
  return stars
}
export const convertPercentageToNumberTarget = (percentage, targetNumber) => {
  const num = Math.round((percentage * targetNumber) / 10)
  return (Math.ceil(num / 5) * 5) / 10
}
export const convertNumberTargetToPercentage = (number, targetNumber) => {
  return Math.round((number * 100) / targetNumber)
}
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
