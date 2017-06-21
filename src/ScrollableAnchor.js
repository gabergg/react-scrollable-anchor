import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Manager from './Manager'

export default class ScrollableAnchor extends Component {
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.id = props.id || props.children.ref
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.refs[Object.keys(this.refs)[0]])
    Manager.addAnchor(this.id, element)
  }

  componentWillUnmount() {
    Manager.removeAnchor(this.id)
  }

  render() {
    const {children, id} = this.props

    return React.cloneElement(children, {
      ref: children.ref || id,
    })
  }
}
