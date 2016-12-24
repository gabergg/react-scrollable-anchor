export const updateHash = (hash, affectHistory) => {
  if (affectHistory) {
    window.location.hash = hash
  } else {
    window.location.replace(`#${hash}`)
  }
}

export const getHash = () => {
  return window.location.hash.slice(1)
}
