import styles from './Notes.module.css'
import Note from '../Note/Note'
import { useNotes } from '../../contexts/notes'
import { useDate } from '../../contexts/date'

interface NotesProps {
  onEditRequest: (id: string) => void
  onAddNoteRequest: () => void
}

export default function Notes(props: NotesProps) {
  const [notes, setNotes] = useNotes()
  const [date, setDate] = useDate()

  const todayNotes = notes.filter(n => n.date === date)

  return (
    <div className={styles.container}>
      <div className={styles.notes}>
        {
          todayNotes.map(note => (
            <Note key={note.id} note={note} onEditRequest={(id: string) => {props.onEditRequest(id)}} />
          ))
        }
      </div>
      <button className={styles.button} onClick={props.onAddNoteRequest}>
        Add Note
      </button>
    </div>
  )
}