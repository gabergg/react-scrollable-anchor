react-styles-provider
=====================

[![npm version](https://img.shields.io/npm/v/react-scrollable-anchor.svg?style=flat-square)](https://www.npmjs.com/package/react-scrollable-anchor)

Lightweight and dynamic anchors in React.

```js
npm install --save react-scrollable-anchor
```

## Usage

### 1. Creating a scrollable anchor

Use the `ScrollableAnchor` tag to wrap any React element, making it a scrollable anchor.

```js
import React, { Component } from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'

export default class Page extends Component {
  render() {
    return (
      <div style={styles.container}>
        <ScrollableAnchor id={'section1'}>
          <div>
            <span> Hello World </span>
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'section2'}>
          <div>
            <span> How are you world? </span>
          </div>
        </ScrollableAnchor>
      </div>
    )
  }
}
```

### 2. Configure

Access ScrollableManager.configure to customize scrolling and anchors.

##### Offset all scrollable anchors by a fixed amount

```js
import { ScrollableManager } from 'react-scrollable-anchor'

// Offset all anchors by -60 to account for a fixed header
ScrollableManager.configure({offset: -60})
```

##### Options:

-----------  -----------------------
option       default
-----------  -----------------------
`offset`     `0`

`scrolling`  `true`

`history`    `false`

`container`  `body`
-----------  -----------------------
