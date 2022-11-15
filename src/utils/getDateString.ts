/*
 *  @param  : Date
 * 
 *  return string => '2000-01-29'
*/

function getDateString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export default getDateString