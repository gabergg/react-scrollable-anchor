import React, { Component } from 'react'
import Example1 from './Example1'
import Example2 from './Example2'
import Example3 from './Example3'
import Example4 from './Example4'
import ScrollableAnchor, { goToTop, goToAnchor, removeHash } from '../../../src'

const examples = [
  {id: 'example1', label: 'Example 1', component: Example1},
  {id: 'example2', label: 'Example 2', component: Example2},
  {id: 'example3', label: 'Example 3', component: Example3},
  {id: 'example4', label: 'Example 4', component: Example4},
]

const styles = {
  header: {
    zIndex: 1,
    backgroundColor: 'rgb(235, 235, 235)',
    height: '60px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 85px',
  },
  fixed: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
  },
  headerToggle: {
    marginRight: '15px',
    cursor: 'pointer',
  },
  exampleToggles: {
    display: 'flex',
    flexDirection: 'row',
  },
  sectionNav: {
    display: 'flex',
    flexDirection: 'row',
  },
  singleSectionNav: {
    marginLeft: '15px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    cursor: 'pointer',
  },
  selectedToggle: {
    backgroundColor: 'black',
    color: 'white',
  }
}

export default class App extends Component {

  state = {
    exampleIdx: 0,
  }

  renderExampleToggle = (example, index) => {
    let toggleStyle = styles.headerToggle
    if (this.state.exampleIdx === index) {
      toggleStyle = {...toggleStyle, ...styles.selectedToggle}
    }
    return (
      <div key={example.id} style={toggleStyle} onClick={() => this.toggleExample(index)}>
        <span> {example.label} </span>
      </div>

    )
  }

  renderSectionNav = (section) => {
    return (
      <div key={section.id} style={styles.singleSectionNav}>
        <a style={styles.link} href={`#${section.id}`}> {section.label} </a>
      </div>
    )
  }

  renderSectionNavHelper = (section) => {
    return (
      <div key={section.id} style={styles.singleSectionNav}>
        <span
          style={styles.link}
          onClick={() => goToAnchor(section.id)}
        >
          {section.label}
        </span>
      </div>
    )
  }

  renderHeader = (fixed, sections, useHelpers) => {
    const headerStyle = fixed ? {...styles.header, ...styles.fixed} : styles.header
    const sectionRender = useHelpers ? this.renderSectionNavHelper : this.renderSectionNav
    return (
      <div style={headerStyle}>
        <div style={styles.exampleToggles}>
          { examples.map(this.renderExampleToggle) }
        </div>
        <div style={styles.sectionNav}>
          { sections.map(sectionRender) }
        </div>
      </div>
    )
  }

  toggleExample = (index) => {
    if (this.state.exampleIdx !== index) {
      removeHash()
      this.setState({exampleIdx: index}, goToTop)
    }
  }

  render() {
    const ExampleContent = examples[this.state.exampleIdx].component

    return (
      <div>
        <ExampleContent renderHeader={this.renderHeader}/>
      </div>
    )
  }
}
