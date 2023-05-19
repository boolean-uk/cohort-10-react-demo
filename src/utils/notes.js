const sortDesc = (notes) => {
  return notes.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
}

export {
  sortDesc
}
