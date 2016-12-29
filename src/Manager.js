import jump from 'jump.js'
import { debounce } from './utils/func'
import { getBestAnchorGivenScrollLocation } from './utils/scroll'
import { getHash, updateHash, removeHash } from './utils/hash'

const defaultConfig = {
  offset: 0,
  scrollDuration: 400,
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
    const bestAnchorId = getBestAnchorGivenScrollLocation(this.anchors, offset)

    if (bestAnchorId && getHash() !== bestAnchorId) {
      this.forcedHash = true
      updateHash(bestAnchorId, false)
    } else if (!bestAnchorId) {
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
