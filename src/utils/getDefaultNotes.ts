import { INote } from "../types";
import getDateString from "./getDateString";
import getRandomId from "./getRandomId";
import getRelativeDateString from "./getRelativeDateString";

const notes: INote[] = [
  {
    id: getRandomId(),
    date: getRelativeDateString(0),
    title: 'Fixing bug',
    content: 'The app crash during unsuccessful login attempt',
    finished: true
  },
  {
    id: getRandomId(),
    date: getRelativeDateString(0),
    title: 'Go shopping',
    content: 'Shopping list:\n- Egg\n- Flour\n- Salt',
    finished: false
  },
  {
    id: getRandomId(),
    date: getRelativeDateString(0),
    title: 'Thinking about the meaning of human existence',
    content: '',
    finished: false
  },
  {
    id: getRandomId(),
    date: getRelativeDateString(0),
    title: 'Watering plant',
    content: '',
    finished: false
  },
  {
    id: getRandomId(),
    date: getRelativeDateString(-1),
    title: 'Go to library',
    content: '',
    finished: true
  },
  {
    id: getRandomId(),
    date: getRelativeDateString(-1),
    title: 'Buy some tomatoes',
    content: '',
    finished: true
  },
  {
    id: getRandomId(),
    date: getRelativeDateString(2),
    title: 'Fix water pipe',
    content: '',
    finished: false
  },
  {
    id: getRandomId(),
    date: getRelativeDateString(36),
    title: 'Go to zoo',
    content: "Don't forget to bring a camera",
    finished: false
  }
]

function getDefaultNotes() {
  return notes
}

export default getDefaultNotes