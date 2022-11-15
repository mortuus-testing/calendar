import { useMemo, useState } from 'react'
import { useDate } from '../../contexts/date'
import { useNotes } from '../../contexts/notes'
import { INote } from '../../types'
import getRandomId from '../../utils/getRandomId'
import styles from './NoteEditor.module.css'

interface NoteEditorProps {
  onCloseRequest: () => void
  onDeleteRequest: (id: string) => void
  onSaveRequest: (id: string) => void
  note: INote
  id: string
  isCreatingNew: boolean
}

export default function NoteEditor(props: NoteEditorProps) {
  const [notes, setNotes] = useNotes()
  const [date, setDate] = useDate()
  const [titleInput, setTitleInput] = useState('')
  const [contentInput, setContentInput] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const note = useMemo(() => {
    if (!(props.isCreatingNew || props.id === '')) {
      setTitleInput(props.note.title);
      setContentInput(props.note.content);
      setIsFinished(props.note.finished);
    } else {
      setTitleInput('');
      setContentInput('');
    }
  }, [props.isCreatingNew, props.id])

  function saveHandler() {
    if (props.isCreatingNew) {
      const id = getRandomId()
      const newNote: INote = {
        id: id,
        date: date,
        title: titleInput,
        content: contentInput,
        finished: false
      }
      setNotes([...notes, newNote]);
      props.onSaveRequest(id);
      props.onCloseRequest();
      return
    }

    setNotes(notes.map(n => {
      if (n.id === props.id) {
        n.title = titleInput
        n.content = contentInput
        n.finished = isFinished
      }
      return n
    }))

    setTimeout(() => {
      setIsDeleting(false);
    }, 1000)

    props.onCloseRequest()
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles['form-placeholder']}>Title</div>
        <input
            type="text"
            className={styles['title-input']}
            value={titleInput}
            onInput={e => {setTitleInput(e.currentTarget.value)}}
          />
        <div className={styles['form-placeholder']}>Content</div>
        <div className={styles['content-input-wrapper']}>
          <textarea 
            className={styles['content-input']}
            value={contentInput}
            onInput={e => {setContentInput(e.currentTarget.value)}}
          ></textarea>
        </div>
      </div>
      {
        props.isCreatingNew || props.id === ''
        ? null
        : (
          <div className={styles['note-control']}>
            <div
            className={`${styles['note-control__item']} ${isFinished ? null : styles['note--finished']}`}
            onClick={() => {setIsFinished(!isFinished)}}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
            {
              isDeleting
              ? (
                <>
                  <div
                    className={`${styles['note-control__item']} ${styles['note-control__delete-no']}`}
                    onClick={() => {setIsDeleting(false)}}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <div
                    className={`${styles['note-control__item']} ${styles['note-control__delete-yes']}`}
                    onClick={() => {
                      props.onDeleteRequest(props.id);
                      setTimeout(() => {
                        setIsDeleting(false)
                      }, 1000)
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                </>
              ) : (
                <div className={styles['note-control__item']} onClick={() => {setIsDeleting(true)}}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </div>
              )
            }
          </div>
        )
      }
      <div className={styles.menu}>
        <button
          className={`${styles.button} ${styles['cancel-button']}`}
          onClick={() => {
            if (!(props.isCreatingNew || props.id === '')) {
              setTimeout(() => {
                setIsFinished(props.note.finished);
                setIsDeleting(false)
              }, 1000)
            }
            props.onCloseRequest();
          }}
        >
          Cancel</button>
        <button className={`${styles.button} ${styles['save-button']}`} onClick={saveHandler}>Save</button>
      </div>
    </div>
  )
}