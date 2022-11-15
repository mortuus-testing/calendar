import { useDate } from '../../contexts/date'
import { useNotes } from '../../contexts/notes'
import styles from './DateItem.module.css'

interface DateItemProps {
  date: string,
  today: boolean,
  buffer: boolean,
  onClick: (date: string) => void
}

export default function DateItem(props: DateItemProps) {
  const [date, setDate] = useDate()
  const [notes, setNotes] = useNotes()
  const currentNote = notes.filter(n => n.date === props.date);

  let isContainNotes = false;
  let isContainActiveNotes = false;
  
  for (let i=0; i<currentNote.length; i++) {
    isContainNotes = true
    if (currentNote[i].finished === false) {
      isContainActiveNotes = true;
      break
    }
  }

  const classes = [styles.container]
  props.today ? classes.push(styles['is-today']) : null
  props.buffer ? classes.push(styles['is-buffer']) : null
  props.date === date ? classes.push(styles['is-active']) : null
  if (isContainActiveNotes) {
    classes.push(styles['is-contain-active-notes'])
  } else {
    if (isContainNotes) {
      classes.push(styles['is-contain-notes'])
    }
  }

  return (
    <div className={classes.join(' ')} onClick={() => {props.onClick(props.date)}}>
      {props.date.split('-')[2]}
    </div>
  )
}