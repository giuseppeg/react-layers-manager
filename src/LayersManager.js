import React from "react"
import { Provider } from "./context"

export default class LayersManager extends React.Component {
  root = React.createRef()
  host = React.createRef()
  state = {
    root: this.root.current,
    host: this.host.current,
  }
  componentDidMount() {
    this.setState({
      root: this.root.current,
      host: this.host.current,
    })
  }
  render() {
    return (
      <Provider value={this.state}>
        <div ref={this.root} style={{ opacity: 0.9999999 }}>
          {this.props.children}
        </div>
        <div ref={this.host} style={{ opacity: 0.9999999 }} />
      </Provider>
    )
  }
}
