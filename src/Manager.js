import jump from 'jump.js'
import { debounce } from './utils/func'
import { getCurrentElement } from './utils/scroll'
import { getHash, updateHash } from './utils/hash'

class Manager {
  constructor() {
    this.anchors = {}
    this.forcedHash = false
    this.config = {
      offset: 0,
    }

    window.addEventListener('scroll', debounce(this.handleScroll, 250), false)
    window.addEventListener('hashchange', this.handleHashChange)

    this.forceHashUpdate = debounce(this.handleHashChange, 1)
  }

  configure = (config) => {
    this.config = {
      ...this.config,
      ...config,
    }
  }

  addAnchor = (id, component) => {
    this.forceHashUpdate()
    this.anchors[id] = component
  }

  removeAnchor = (id) => {
    delete this.anchors[id]
  }

  handleScroll = () => {
    const anchorIds = Object.keys(this.anchors)
    let anchorInView = false
    for (let i = 0; i < anchorIds.length; i++) {
      const id = anchorIds[i]
      const element = this.anchors[id]
      if (getCurrentElement(element, this.config.offset)) {
        anchorInView = true
        if (getHash() !== id) {
          this.forcedHash = true
          updateHash(id, false)
        }
        return
      }
    }

    if (!anchorInView) {
      this.forcedHash = true
      updateHash('', false)
    }
  }

  handleHashChange = () => {
    if (this.forcedHash) {
      this.forcedHash = false
    } else {
      this.goToSection(getHash())
    }
  }

  goToSection = (id) => {
    jump(this.anchors[id], {
      duration: 400,
      offset: this.config.offset,
    })
  }
}

export default new Manager()
