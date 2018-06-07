import React from "react"
import { createPortal } from "react-dom"
import { Consumer } from "./context"

const Layer = props => (
  <Consumer>
    {({ host, root }) =>
      host && root && <LayerImpl {...props} host={host} root={root} />
    }
  </Consumer>
)
export default Layer

class LayerImpl extends React.Component {
  state = { container: null }
  componentDidMount() {
    const { host, index, onMount, root } = this.props
    const container = host.ownerDocument.createElement("div")
    const sibling = typeof index === "number" && host.children[index]
    sibling
      ? host.insertBefore(container, sibling)
      : host.appendChild(container)
    this.setState({ container }, () => {
      root && onMount && onMount(root)
    })
  }
  componentWillUnmount() {
    const { container } = this.state
    const { root, host, onUnmount } = this.props
    root && onUnmount && onUnmount(root)
    host && host.removeChild(container)
  }
  render() {
    const { container } = this.state
    return container && createPortal(this.props.children, container)
  }
}
