export const getHash = () => {
  return decodeURI(window.location.hash.slice(1))
}

export const updateHash = (hash, affectHistory) => {
  if (affectHistory) {
    window.location.hash = hash
  } else {
    window.location.replace(`#${hash}`)
  }
}

// remove hash in url without affecting history or forcing reload
export const removeHash = () => {
  history.replaceState(
    "",
    document.title,
    window.location.pathname + window.location.search
  )
}
