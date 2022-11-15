import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface IDateContext {
  date: string
  setDate: Dispatch<SetStateAction<string>>
}

const DateContext = createContext<IDateContext | null>(null)

function DateProvider(props: {children: ReactNode}) {
  const [date, setDate] = useState('')

  const value = {
    date: date,
    setDate: setDate
  }

  return (
    <DateContext.Provider value={value}>
      {props.children}
    </DateContext.Provider>
  )
}

function useDate() {
  const {date, setDate} = useContext(DateContext) as IDateContext
  const temp: [string, Dispatch<SetStateAction<string>>] = [date, setDate]
  return temp
}

export {
  DateProvider,
  useDate
}