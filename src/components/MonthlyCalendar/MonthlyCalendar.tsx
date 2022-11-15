import { ReactNode, useState } from 'react'
import styles from './MonthlyCalendar.module.css'
import ArrowButton from '../ArrowButton/ArrowButton'
import getDateString from '../../utils/getDateString'
import getFirstDayInMonth from '../../utils/getFirstDayInMonth'
import getDaysInMonth from '../../utils/getDaysInMonth'
import DateItem from '../DateItem/DateItem'
import { useDate } from '../../contexts/date'

interface MonthlyCalendarProps {
  onNotesIconClick: () => void
  onFlipRequest: () => void
  onDateChange: () => boolean
}

export default function MonthlyCalendar(props: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(getDateString(new Date()))
  const [date, setDate] = useDate()
  const year = currentDate.split('-')[0]
  const month = currentDate.split('-')[1]
  const dayCount = getDaysInMonth(new Date(currentDate))
  const firstDay = getFirstDayInMonth(new Date(currentDate))
  const lastDay = (firstDay + dayCount) % 7
  const dateList:ReactNode[] = []

  const handleDateToggle = (date: string) => {
    const allowed = props.onDateChange()
    if (!allowed) {return}
    setDate(date)
  }
  const toPreviousMonth = () => {
    const allowed = props.onDateChange()
    if (!allowed) {return}
    const dateObj = new Date(currentDate)
    dateObj.setMonth( dateObj.getMonth() - 1 )
    setCurrentDate(getDateString(dateObj))
  }
  const toNextMonth = () => {
    const allowed = props.onDateChange()
    if (!allowed) {return}
    const dateObj = new Date(currentDate)
    dateObj.setMonth( dateObj.getMonth() + 1 )
    setCurrentDate(getDateString(dateObj))
  }

  // Generate date for last month
  for (let i=firstDay; i>0; i--) {
    const lastMonth = new Date(parseInt(year),  parseInt(month) - 1)
    lastMonth.setDate(lastMonth.getDate() - i)
    const dateString = getDateString(lastMonth)
    const today = dateString === getDateString(new Date())
    dateList.push(<DateItem onClick={handleDateToggle} key={dateString} date={dateString} today={today} buffer={true} />)
  }

  // Generate date for this month
  for (let i=1; i<=dayCount; i++) {
    const dateString = year + '-' + month + '-' + i
    const today = dateString === getDateString(new Date())
    dateList.push(<DateItem onClick={handleDateToggle} key={dateString} date={dateString} today={today} buffer={false}/>)
  }

  // Generate date for next month
  if (lastDay > 0) {
    for (let i=0; i<7-lastDay; i++) {
      const nextMonth = new Date(parseInt(year),  parseInt(month))
      nextMonth.setDate(nextMonth.getDate() + i)
      const dateString = getDateString(nextMonth)
      const today = dateString === getDateString(new Date())
      dateList.push(<DateItem onClick={handleDateToggle} key={dateString} date={dateString} today={today} buffer={true}/>)
    }
  }
  

  return (
    <div className={styles.container}>
      <ArrowButton direction='left' onClick={toPreviousMonth}/>
      <ArrowButton direction='right' onClick={toNextMonth}/>

      <div className={styles['month-year']}>
        {new Date(currentDate).toLocaleString('en', {month: 'long', year: 'numeric'})}
      </div>

      <div className={styles['day-placeholder-container']}>
        <div className={styles['day-placeholder']}>天</div>
        <div className={styles['day-placeholder']}>一</div>
        <div className={styles['day-placeholder']}>二</div>
        <div className={styles['day-placeholder']}>三</div>
        <div className={styles['day-placeholder']}>四</div>
        <div className={styles['day-placeholder']}>五</div>
        <div className={styles['day-placeholder']}>六</div>
      </div>
      <div className={styles['date-container']}>
        {dateList}
      </div>

      <div className={styles['calendar-control']}>
        <div className={styles['control-item']}></div>
        <div className={styles['control-item']} onClick={props.onFlipRequest}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </div>
        <div className={styles['control-item']} onClick={props.onNotesIconClick}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
        </div>
      </div>
    </div>
  )
}