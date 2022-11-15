import getDateString from "./getDateString"

export default function getRelativeDateString(num: number) {
  const date = new Date()
  date.setDate(date.getDate() + num)
  return getDateString(date)
} 