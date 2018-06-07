import React from "react"
import { Provider } from "./context"

export default class LayersManager extends React.Component {
  root = React.createRef()
  host = React.createRef()
  componentDidMount() {
    this.forceUpdate()
  }
  render() {
    return (
      <Provider value={{ root: this.root.current, host: this.host.current }}>
        <div ref={this.root} style={{ isolation: "isolate" }}>
          {this.props.children}
        </div>
        <div ref={this.host} style={{ isolation: "isolate" }} />
      </Provider>
    )
  }
}
