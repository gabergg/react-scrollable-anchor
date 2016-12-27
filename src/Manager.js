import jump from 'jump.js'
import { debounce } from './utils/func'
import { isElementInView } from './utils/scroll'
import { getHash, updateHash, removeHash } from './utils/hash'

const defaultConfig = {
  offset: 0,
  scrollDuration: 400,
  changeHistory: false,
  scrollContainer: null,
}

class Manager {
  constructor() {
    this.anchors = {}
    this.forcedHash = false
    this.config = defaultConfig

    window.addEventListener('scroll', debounce(this.handleScroll, 250), false)
    window.addEventListener('hashchange', this.handleHashChange)

    this.forceHashUpdate = debounce(this.handleHashChange, 1)
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
    this.forceHashUpdate()
    this.anchors[id] = component
  }

  removeAnchor = (id) => {
    delete this.anchors[id]
  }

  handleScroll = () => {
    const {offset, changeHistory, scrollContainer} = this.config
    const anchorIds = Object.keys(this.anchors)
    let anchorInView = false
    for (let i = 0; i < anchorIds.length; i++) {
      const id = anchorIds[i]
      const element = this.anchors[id]
      if (isElementInView(element, offset, scrollContainer)) {
        anchorInView = true
        if (getHash() !== id) {
          this.forcedHash = true
          updateHash(id, changeHistory)
        }
        return
      }
    }

    if (!anchorInView) {
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
