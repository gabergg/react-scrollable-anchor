export const getPageScrollTop = () => {
  return document.body.scrollTop || document.documentElement.scrollTop
}

export const getElementTopOffset = (element) => {
  const rect = element.getBoundingClientRect()
  return rect.top + getPageScrollTop()
}

export const isElementInView = (element, extraOffset = 0) => {
  const location = getPageScrollTop()
  const offsetTop = getElementTopOffset(element) + extraOffset
  return location >= offsetTop && location < offsetTop + element.offsetHeight
}
