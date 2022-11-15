import { INote } from "../types";
import getDateString from "./getDateString";
import getRandomId from "./getRandomId";

const today = new Date()
const yesterday = new Date()
const tomorrow = new Date()

yesterday.setDate(today.getDate() - 1)
tomorrow.setDate(today.getDate() + 1)

const notes: INote[] = [
  {
    id: getRandomId(),
    date: getDateString(today),
    title: 'Doing homework',
    content: '',
    finished: true
  },
  {
    id: getRandomId(),
    date: getDateString(today),
    title: 'Fixing bug',
    content: '',
    finished: false
  },
  {
    id: getRandomId(),
    date: getDateString(today),
    title: 'Go to bank then go to train station and buy a ticket to Singapore',
    content: '',
    finished: false
  },
  {
    id: getRandomId(),
    date: getDateString(today),
    title: 'Watering the plant',
    content: '',
    finished: false
  },
  {
    id: getRandomId(),
    date: getDateString(yesterday),
    title: 'Read a book',
    content: '',
    finished: true
  },
  {
    id: getRandomId(),
    date: getDateString(yesterday),
    title: 'Buy some tomatoes',
    content: '',
    finished: true
  },
  {
    id: getRandomId(),
    date: getDateString(tomorrow),
    title: 'Fix water pipe',
    content: '',
    finished: false
  }
]

function getDefaultNotes() {
  return notes
}

export default getDefaultNotes