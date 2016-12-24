export const getHash = () => {
  return window.location.hash.slice(1)
}

export const updateHash = (hash, affectHistory) => {
  if (affectHistory) {
    window.location.hash = hash
  } else {
    window.location.replace(`#${hash}`)
  }
}

export const removeHash = () => {
  history.replaceState("", document.title, window.location.pathname + window.location.search)
}
