export function getFormattedDate(date) {
  const newDate = new Date(date).toLocaleDateString()
  return newDate.split('-').map(v => v < 10 ? `0${v}` : v).reverse().join('/')
}
