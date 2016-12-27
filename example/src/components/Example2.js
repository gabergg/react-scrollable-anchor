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

export default class Example2 extends Component {

  componentWillMount() {
    configureAnchors({offset: -60, scrollDuration: 200})
  }

  renderSection = (section) => {
    const props = {...section, sections}
    return (
      <ScrollableAnchor key={section.id} id={section.id}>
        <Section {...props}/>
      </ScrollableAnchor>
    )
  }

  render() {
    return (
      <div>
        { this.props.renderHeader(true, sections) }
        <div style={{marginTop: '60px'}}>
          { sections.map(this.renderSection) }
        </div>
      </div>
    )
  }
}
