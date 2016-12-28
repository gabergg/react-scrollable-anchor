import Manager from './Manager'
import { updateHash } from './utils/hash'
export { default } from './ScrollableAnchor'
export const configureAnchors = Manager.configure
export const goToTop = Manager.goToTop
export const goToAnchor = updateHash
