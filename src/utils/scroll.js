export const getScrollTop = () => {
  return document.body.scrollTop || document.documentElement.scrollTop
}

// get vertical offsets of element, taking scrollTop into consideration
export const getElementOffset = (element) => {
  const scrollTop = getScrollTop()
  const {top, bottom} = element.getBoundingClientRect()
  return {
    top: Math.floor(top + scrollTop),
    bottom: Math.floor(bottom + scrollTop)
  }
}

// does scrollTop live within element bounds?
export const doesElementContainScrollTop = (element, extraOffset = 0) => {
  const scrollTop = getScrollTop()
  const offsetTop = getElementOffset(element).top + extraOffset
  return scrollTop >= offsetTop && scrollTop < offsetTop + element.offsetHeight
}

// is el2's location more relevant than el2,
// parent-child relationship aside?
export const checkLocationRelevance = (el1, el2) => {
  const {top: top1, bottom: bottom1} = getElementOffset(el1)
  const {top: top2, bottom: bottom2} = getElementOffset(el2)
  if (top1 === top2) {
    if (bottom1 === bottom2) {
      // top and bottom of compared elements are the same,
      // so return one randomly in a deterministic way
      return el1 < el2
    }
    // top of compared elements is the same, so return whichever
    // element has its bottom higher on the page
    return bottom2 < bottom1
  }
  // top of compared elements differ, so return true
  // if tested element has its top lower on the page
  return top2 > top1
}

// check if el2 is more relevant than el1, considering child-parent
// relationships as well as node location.
export const checkElementRelevance = (el1, el2) => {
  if (el1.contains(el2)) {
    // el2 is child, so it gains relevance priority
    return true
  } else if (!el2.contains(el1) && checkLocationRelevance(el1, el2)) {
    // el1 and el2 are unrelated, but el2 has a better location,
    // so it gains relevance priority
    return true
  }
  return false
}

// given a set of anchors, find which one is, given the following logic:
// 1. children nodes are more relevant than parent nodes
// 2. if neither node contains the other, and their top locations differ,
//    the node with the top lower on the page is more relevant
// 3. if neither node contains the other, and their top locations are the same,
//    the node with the bottom higher on the page is more relevant
// 4. if neither node contains the other, and their top and bottom locations
//    are the same, a node is chosen at random, in a deterministic way,
//    to be more relevant.
export const getBestAnchorGivenScrollLocation = (anchors, offset) => {
  let bestId, bestElement

  Object.keys(anchors).forEach((id) => {
    const element = anchors[id]
    if (doesElementContainScrollTop(element, offset)) {
      if (!bestElement || checkElementRelevance(bestElement, element)) {
        bestElement = element
        bestId = id
      }
    }
  })
  return bestId
}
