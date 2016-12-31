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

const styles = {
  offsetUp: {
    marginTop: '-549px',
  },
  extraTall: {
    height: '700px',
  },
}

export default class Example4 extends Component {

  componentWillMount() {
    configureAnchors({offset: -60, scrollDuration: 300})
  }

  renderSection = (section) => {
    const props = {...section, sections, style: styles.extraTall}
    const propsOffset = {...props, style: styles.offsetUp}
    return (
      <div key={section.id}>
        <ScrollableAnchor id={section.id}>
          <Section {...props}/>
        </ScrollableAnchor>
        <ScrollableAnchor id={`${section.id}offset`}>
          <Section {...propsOffset}/>
        </ScrollableAnchor>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.props.renderHeader(true, sections, true) }
        <div style={{marginTop: '60px'}}>
          { sections.map(this.renderSection) }
        </div>
      </div>
    )
  }
}
