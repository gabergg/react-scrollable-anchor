import React, { Component } from 'react'
import ScrollableAnchor, { configureAnchors } from '../../../src'
import Section from './Section'

const sections = [
  {id: 'section1', label: 'Section 1', backgroundColor: 'red'},
  {id: 'section2', label: 'Section 2', backgroundColor: 'darkgray'},
  {id: 'section3', label: 'Section 3', backgroundColor: 'green'},
  {id: 'section4', label: 'Section 4', backgroundColor: 'brown'},
  {id: 'section5', label: 'Section 5', backgroundColor: 'lightpink'},
]

export default class Example3 extends Component {

  state = {
    scrollTop: 0,
  }

  componentDidMount() {
    const {scrollable} = this.refs

    if (scrollable) {
      scrollable.addEventListener('scroll', this.handleScroll)
      configureAnchors({
        history: true,
        scrollContainer: scrollable,
      })
    }
  }

  componentWillUnmount() {
    const {scrollable} = this.refs

    scrollable && scrollable.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({
      scrollTop: this.refs.scrollable.scrollTop,
    })
  }


  renderSection = (section) => {
    const props = {...section, sections}
    return (
      <div key={section.id}>
        <ScrollableAnchor id={section.id}>
          <Section {...props}/>
        </ScrollableAnchor>
        <div style={{height: '200px'}}/>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.props.renderHeader(false, sections) }
        <div>
          <div ref='scrollable'>
            { sections.map(this.renderSection) }
          </div>
        </div>
      </div>
    )
  }
}
