# 📚 React Layers Manager

Manage layers and `z-index` in React applications effectively.

No more

```css
z-index: 10000;
z-index: 10001;
z-index: 999;
z-index: 99999;
```

That's right 👦

## 👩‍🏫 The issue with z-index: 9999

Some [CSS properties create stacking contextes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context).

Within a stacking context, child elements are stacked according to [some rules](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Adding_z-index) and in general one on top of each other based on their z-index value.

The problem though is that elements cannot escape their parent stackig context.

What this means in practice is that an element with `z-index: 9999` inside of a stacking context with `z-index: 1` will always be below a stacking context sibling of the latter with `z-index: 2` for example:

```html
<div style="position: absolute; z-index: 2; top: 0;">
  I am on top and I don't care about your 9999
</div>

<div style="position: absolute; z-index: 1; top: 0;">
  <div style="position: absolute; z-index: 9999;">
    I want to be in front of you
  </div>
</div>
```

`react-layers-manager` solves this issue.

## 💪 How it works

`react-layers-manager` leverages the power of the new React Context API introduced in React 16.3 and Portals to render your layers as siblings of your application root.

This way layers are guaranteed to always be on top of your application!

## Installation

```
npm i react-layers-manager
```

## Usage

`react-layers-manager` exposes two components:

* `LayersManager` that is just a wrapper for your app
* `Layer` to be used contextually in your components when you want to render something in a layer

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { LayersManager, Layer } from 'react-layers-manager'

const SampleModal = () => (
  <Layer>
    <Modal>We have updated our privacy policy :trollface:</Modal>
  </Layer>
)

const App = () => (
  <h1>Hello folks</h1>
  <SampleModal />
  <SampleModal />
)

ReactDOM.render(
  <LayersManager>
    <App />
  </LayersManager>,
  document.getElementById('root')
)
```

### Layer

The `Layer` component accepts a few optional `props`:

```js
type Props = {
  // Renders a layer at a specific index.
  // By default layers are appended to the layers manager container.
  index?: number,

  // Invoked when the layer mounts with the app element.
  // This is useful to set aria-hidden="true" for example when showing a modal
  // or disable scrolling.
  onMount?: (root: HTMLElement) => void,

  // Invoked when the layer unmounts with the app element.
  onUnmount?: (root: HTMLElement) => void,
}
```
