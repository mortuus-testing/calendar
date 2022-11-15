import { useEffect, useState } from 'react'
import styles from './App.module.css'
import DailyCalendar from './components/DailyCalendar/DailyCalendar'
import MonthlyCalendar from './components/MonthlyCalendar/MonthlyCalendar'
import { useDate } from './contexts/date'
import { useNotes } from './contexts/notes'
import getDateString from './utils/getDateString'
import getDefaultNotes from './utils/getDefaultNotes'
import Notes from './components/Notes/Notes'
import NoteEditor from './components/NoteEditor/NoteEditor'

export default function App() {
  const [date, setDate] = useDate()
  const [notes, setNotes] = useNotes()
  const [currentEdited, setCurrentEdited] = useState('')
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Set default notes and date
    setDate(getDateString(new Date()))
    setNotes(getDefaultNotes())
  }, [])

  function toggleCompactMode() {
    if (isEditing) {
      const card = document.querySelector(`.${styles['second-card']}`) as HTMLElement
      card.classList.add(styles['card--shake'])
      setTimeout(() => {
        card.classList.remove(styles['card--shake'])
      }, 500)
      return
    }

    const target = document.querySelector('.'+styles.app) as HTMLElement
    target.classList.toggle(styles['app--compact'])
  }

  function flipCard(selector: string) {
    const target = document.querySelector(selector) as HTMLElement
    target.classList.toggle(styles['card--flipped'])
  }

  const handleDateChange = () => {
    if (isEditing) {
      const card = document.querySelector(`.${styles['second-card']}`) as HTMLElement
      card.classList.add(styles['card--shake'])
      setTimeout(() => {
        card.classList.remove(styles['card--shake'])
      }, 500)
      return false
    }
    return true
  }
  const handleCloseRequest = () => {
    flipCard(`.${styles['second-card']}`);
    setTimeout(() => {
      setIsCreatingNew(false);
      setIsEditing(false);
    }, 1000)
  }
  const handleSaveRequest = (id: string) => {
    setCurrentEdited(id)
  }
  const handleAddNoteRequest = () => {
    setIsCreatingNew(true);
    setCurrentEdited('');
    flipCard(`.${styles['second-card']}`);
    setIsEditing(true)
  }
  const handleEditRequest = (id: string) => {
    setCurrentEdited(id);
    flipCard(`.${styles['second-card']}`);
    setIsEditing(true)
  }
  const handleDeleteRequest = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
    flipCard(`.${styles['second-card']}`);
    setTimeout(() => {
      setCurrentEdited('')
      setIsEditing(false);
    }, 1000)
  }

  return (
    <div className={`${styles.app} ${styles['app--compact']}`}>
      <div className={`${styles.card} ${styles['first-card']}`}>
        <div className={styles['card__front-page']}>
          <DailyCalendar
            onCalendarIconClick={() => {flipCard(`.${styles['first-card']}`)}}
            onNotesIconClick={() => {toggleCompactMode()}}
            onDateChange={handleDateChange}
          />
        </div>
        <div className={styles['card__back-page']}>
          <MonthlyCalendar
            onFlipRequest={() => {flipCard(`.${styles['first-card']}`)}}
            onNotesIconClick={() => {toggleCompactMode()}}
            onDateChange={handleDateChange}
          />
        </div>
      </div>
      <div className={`${styles.card} ${styles['second-card']}`}>
        <div className={styles['card__front-page']}>
          <Notes
            onAddNoteRequest={handleAddNoteRequest}
            onEditRequest={handleEditRequest}
          />
        </div>
        <div className={styles['card__back-page']}>
          <NoteEditor
            id={currentEdited}
            note={notes.filter(n => n.id === currentEdited)[0]}
            isCreatingNew={isCreatingNew}
            onCloseRequest={handleCloseRequest}
            onSaveRequest={handleSaveRequest}
            onDeleteRequest={handleDeleteRequest}
          />
        </div>
      </div>
    </div>
  )
}