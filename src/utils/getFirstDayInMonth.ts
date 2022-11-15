/*
 *  @param : Date Object
 *
 *  return number
 *    0 => Sunday
 *    1 => Monday
 *    ...
 *    6 => Saturday
*/
export default function getFirstDayInMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}