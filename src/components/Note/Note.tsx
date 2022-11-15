import { useNotes } from '../../contexts/notes'
import { INote } from '../../types'
import styles from './Note.module.css'

interface NoteProps {
  note: INote
  onEditRequest: (id: string) => void
}

export default function Note(props: NoteProps) {
  const [notes, setNotes] = useNotes()

  function toggleFinished() {
    setNotes(notes.map(n => {
      if (n.id === props.note.id) {
        n.finished = !n.finished
      }
      return n
    }))
  }

  return (
    <div className={`${styles.note} ${props.note.finished ? styles['note--finished'] : ''}`}>
      <div className={styles['note-control-wrapper']} onClick={toggleFinished}>
        <div className={styles['note-control']}></div>
      </div>
      <div className={styles['note-body']} onClick={() => {props.onEditRequest(props.note.id)}}>
        {props.note.title}
      </div>
    </div>
  )
}