import jump from 'jump.js'
import { debounce } from './utils/func'
import { isElementInView, getElementTopOffset, getElementBottomOffset } from './utils/scroll'
import { getHash, updateHash, removeHash } from './utils/hash'

const defaultConfig = {
  offset: 0,
  scrollDuration: 400,
}

const isElementMoreProminent = (bestOption, element) => {
  const bestTopOffset = getElementTopOffset(bestOption)
  const elementTopOffset = getElementTopOffset(element)
  if (bestTopOffset === elementTopOffset) {
    bestBottomOffset = getElementBottomOffset(bestOption)
    elementBottomOffset = getElementBottomOffset(bestOption)
    if (bestBottomOffset === elementBottomOffset) {
      // top and bottom of compared elements are the same,
      // so return one randomly in a deterministic way
      return bestOption < element
    }
    // top of compared elements is the same, so return whichever
    // element has its bottom higher on the page
    return elementBottomOffset < bestBottomOffset
  }
  // top of compared elements differ, so return whichever
  // element has its top higher on the page
  return elementTopOffset < bestTopOffset
}

class Manager {
  constructor() {
    this.anchors = {}
    this.forcedHash = false
    this.config = defaultConfig

    this.scrollHandler = debounce(this.handleScroll, 250)
    this.forceHashUpdate = debounce(this.handleHashChange, 1)
  }

  addListeners = () => {
    window.addEventListener('scroll', this.scrollHandler, false)
    window.addEventListener('hashchange', this.handleHashChange)
  }

  removeListeners = () => {
    window.removeEventListener('scroll', this.scrollHandler, false)
    window.removeEventListener('hashchange', this.handleHashChange)
  }

  configure = (config) => {
    this.config = {
      defaultConfig,
      ...config,
    }
  }

  goToTop = () => {
    this.forcedHash = true
    window.scroll(0,0)
    removeHash()
  }

  addAnchor = (id, component) => {
    if (Object.keys(this.anchors).length === 0) {
      this.addListeners()
    }
    this.forceHashUpdate()
    this.anchors[id] = component
  }

  removeAnchor = (id) => {
    delete this.anchors[id]
    if (Object.keys(this.anchors).length === 0) {
      this.removeListeners()
    }
  }

  handleScroll = () => {
    const {offset} = this.config
    const anchorIds = Object.keys(this.anchors)
    let bestOption = null
    let bestId = null
    anchorIds.forEach((id) => {
      const element = this.anchors[id]
      if (isElementInView(element, offset)) {
        const v0 = performance.now()
        if (!bestOption) {
          bestOption = element
          bestId = id
        } else if (bestOption && bestOption.contains(element)) {
          bestOption = element
          bestId = id
        } else if (bestOption && !element.contains(bestOption) && isElementMoreProminent(bestOption, element)) {
          bestOption = element
          bestId = id
        }
      }
    })

    if (bestId && getHash() !== bestId) {
      this.forcedHash = true
      updateHash(bestId, false)
    } else if (!bestId) {
      removeHash()
    }
  }

  handleHashChange = (e) => {
    if (this.forcedHash) {
      this.forcedHash = false
    } else {
      this.goToSection(getHash())
    }
  }

  goToSection = (id) => {
    jump(this.anchors[id], {
      duration: this.config.scrollDuration,
      offset: this.config.offset,
    })
  }
}

export default new Manager()
