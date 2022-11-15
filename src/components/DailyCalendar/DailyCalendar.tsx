import styles from './DailyCalendar.module.css'
import ArrowButton from '../ArrowButton/ArrowButton'
import { useDate } from '../../contexts/date'
import getDateString from '../../utils/getDateString'

interface DailyCalendarProps {
  onNotesIconClick: () => void
  onCalendarIconClick: () => void
  onDateChange: () => boolean
}

export default function DailyCalendar(props: DailyCalendarProps) {
  const [date, setDate] = useDate()

  function togglePrevious() {
    const allowed = props.onDateChange()
    if (!allowed) {return}
    const prev = new Date(date)
    prev.setDate(prev.getDate() - 1)
    setDate(getDateString(prev))
  }

  function toggleNext() {
    const allowed = props.onDateChange()
    if (!allowed) {return}
    const next = new Date(date)
    next.setDate(next.getDate() + 1)
    setDate(getDateString(next))
  }

  return (
    <div className={styles.container}>
      <ArrowButton direction='left' onClick={togglePrevious}/>
      <ArrowButton direction='right' onClick={toggleNext}/>

      <div className={styles.day}>
        {new Date(date).toLocaleString('en-US', {weekday: 'long'})}
      </div>
      <div className={styles.date}>
        {date.split('-')[2]}
      </div>
      <div className={styles['month-year']}>
        {new Date(date).toLocaleString('en-US', {month: 'long', year: 'numeric'})}
      </div>

      <div className={styles.menu}>
        <div className={styles['menu-item']} onClick={props.onCalendarIconClick}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <div className={styles['menu-item']} onClick={props.onNotesIconClick}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
        </div>
      </div>
    </div>
  )
}