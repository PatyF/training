import React from 'react'

class Loading extends React.Component {
  render() {
    return this.props.carregando == true
      ? <div>Carregando ...</div>
      : <div> {this.props.children} </div>
  }
}

export default Loading
