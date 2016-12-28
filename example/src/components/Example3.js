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

  componentWillMount() {
    configureAnchors({offset: -60, scrollDuration: 200})
  }

  renderSection = (section) => {
    const props = {...section, sections}
    return (
      <div key={section.id}>
        <ScrollableAnchor key={section.id} id={`${section.id}outer`}>
          <div style={{height: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <ScrollableAnchor id={`${section.id}inner`}>
              <div style={{height: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <ScrollableAnchor id={section.id}>
                  <Section {...props}/>
                </ScrollableAnchor>
              </div>
            </ScrollableAnchor>
          </div>
        </ScrollableAnchor>
        <div style={{height: '300px'}}/>
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
