export const formatDate = (dateString) => {
  const date = new Date(dateString)

  return date.toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}
