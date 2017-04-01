react-scrollable-anchor
=====================

[![npm version](https://img.shields.io/npm/v/react-scrollable-anchor.svg?style=flat-square)](https://www.npmjs.com/package/react-scrollable-anchor)

Lightweight library for smooth scrolling anchors in React, tied to URL hash.

* Land on correct anchor when page is loaded, based on URL hash value.
* Scroll smoothly to anchors when URL hash changes. Easy links to sections with `<a href='#sectionId'>`.
* URL hash updates automatically to reflect section in view
* Option to record history on hash changes

```js
npm install --save react-scrollable-anchor
```

## Examples

[Live Demo](http://gabegsell.com/anchors/) or [Source](https://github.com/gabergg/react-scrollable-anchor/tree/master/example/src/components)

To run examples locally, `npm run example`, then open your
browser to localhost:3210.

## Usage

### 1. Creating a scrollable anchor

Use the `ScrollableAnchor` tag to wrap any React element, making it a scrollable anchor.

```js
import React, { Component } from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'

export default class Page extends Component {
  render() {
    return (
      <div>
        <a href='#section1'> Go to section 1 </a>
        <a href='#section2'> Go to section 2 </a>
        <ScrollableAnchor id={'section1'}>
          <div> Hello World </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'section2'}>
          <div> How are you world? </div>
        </ScrollableAnchor>
      </div>
    )
  }
}
```

### 2. Configure

Access configureAnchors to customize scrolling and anchors.

##### Offset all scrollable anchors by a fixed amount

```js
import { configureAnchors } from 'react-scrollable-anchor'

// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms
configureAnchors({offset: -60, scrollDuration: 200})
```

##### Options:

| option                | default          |
| --------------------  | ---------------- |
| `offset`              | `0`              |
| `scrollDuration`      | `400`            |
| `keepLastAnchorHash`  | `false`          |

### 3. Utilities

A small toolkit of scrolling utilies for use with anchors

##### Jump to top of page in a way that plays nicely with scrollable anchors

```js
import { goToTop } from 'react-scrollable-anchor'

// scroll to top of the page
goToTop()
```

##### Scroll to any scrollable anchor, with option to record history

```js
import { goToAnchor } from 'react-scrollable-anchor'

// scroll to #section1 without saving that hash update in history
goToAnchor('section1')
goToAnchor('section1', false)

// scroll to #section1, saving that hash update in history
goToAnchor('section1', true)
```

##### Clear the URL hash without affecting scroll location at all

```js
import { removeHash } from 'react-scrollable-anchor'

// clear URL hash
removeHash()
```

## Issues and feature requests

Please open issues on [Github](https://github.com/gabergg/react-scrollable-anchor/issues). Issues are easier to address if you include context and code samples.

## Contributing

Please contribute!

## Feedback or contact

Feel free to contact me at gabergg@gmail.com.
