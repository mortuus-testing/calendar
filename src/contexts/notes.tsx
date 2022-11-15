import { createContext, ReactNode, useState, useContext, Dispatch, SetStateAction } from "react"
import { INote } from "../types"

interface INotesContext {
  notes: INote[]
  setNotes: Dispatch<SetStateAction<INote[]>>
}

const NotesContext = createContext<INotesContext | null>(null)

function NotesProvider(props: {children: ReactNode}) {
  const [notes, setNotes] = useState(Array<INote>)

  const value = {
    notes: notes,
    setNotes: setNotes
  }

  return (
    <NotesContext.Provider value={value}>
      {props.children}
    </NotesContext.Provider>
  )
}

function useNotes() {
  const {notes, setNotes} = useContext(NotesContext) as INotesContext
  const temp: [INote[], Dispatch<SetStateAction<INote[]>>] = [notes, setNotes]
  return temp
}

export {
  NotesProvider,
  useNotes
}