export const getScrollTop = () => {
  return document.body.scrollTop || document.documentElement.scrollTop
}

export const getElementTopOffset = (element) => {
  const rect = element.getBoundingClientRect()
  return rect.top + getScrollTop()
}

export const getElementBottomOffset = (element) => {
  const rect = element.getBoundingClientRect()
  return rect.bottom + getScrollTop()
}

export const isElementInView = (element, extraOffset = 0) => {
  const scrollTop = getScrollTop()
  const offsetTop = getElementTopOffset(element) + extraOffset
  return scrollTop >= offsetTop && scrollTop < offsetTop + element.offsetHeight
}
