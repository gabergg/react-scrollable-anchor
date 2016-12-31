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
  centerColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}

export default class Example3 extends Component {

  componentWillMount() {
    configureAnchors({offset: -60, scrollDuration: 200})
  }

  renderSection = (section) => {
    const props = {...section, sections}
    return (
      <div key={section.id}>
        <ScrollableAnchor>
          <div ref={`${section.id}outer`} style={{...styles.centerColumn, height: '900px'}}>
            <ScrollableAnchor id={`${section.id}inner`}>
              <div style={{...styles.centerColumn, backgroundColor: 'yellow', height: '700px'}}>
                <ScrollableAnchor id={section.id}>
                  <Section {...props}/>
                </ScrollableAnchor>
              </div>
            </ScrollableAnchor>
          </div>
        </ScrollableAnchor>
        <div id={`${section.id}classic`} style={{height: '300px', backgroundColor: 'black'}}/>
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
