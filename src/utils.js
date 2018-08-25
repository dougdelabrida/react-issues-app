export function getFormattedDate(date) {
  const dateString = new Date(date).toLocaleDateString()
  return dateString.split('-').map(v => v < 10 ? `0${v}` : v).reverse().join('/')
}
