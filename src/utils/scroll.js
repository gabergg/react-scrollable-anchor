export const getScrollTop = (scrollContainer) => {
  if (scrollContainer && typeof scrollContainer.scrollTop === 'number') {
    return scrollContainer.scrollTop
  }
  return document.body.scrollTop || document.documentElement.scrollTop
}

export const getElementTopOffset = (element, scrollTop) => {
  const rect = element.getBoundingClientRect()
  return rect.top + scrollTop
}

export const isElementInView = (element, extraOffset = 0, scrollContainer) => {
  const scrollTop = getScrollTop(scrollContainer)
  const offsetTop = getElementTopOffset(element, scrollTop) + extraOffset
  return scrollTop >= offsetTop && scrollTop < offsetTop + element.offsetHeight
}
