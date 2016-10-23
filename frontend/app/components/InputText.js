import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

class InputText extends React.Component {
  render() {
    return <FormGroup validationState={this.props.erros ? 'error' : null}>
      <ControlLabel>{this.props.label}</ControlLabel>
      {this.props.componentClass
        ? <FormControl
          componentClass="textarea"
          disabled={this.props.disabled ? true : false}
          type="text"
          placeholder={this.props.label} value={this.props.value}
          onChange={this.props.onChange} />
        : <FormControl
          type="text"
          disabled={this.props.disabled ? true : false}
          placeholder={this.props.label} value={this.props.value}
          onChange={this.props.onChange} />
      }
      <HelpBlock>{this.props.erros}</HelpBlock>
    </FormGroup>
  }
}

export default InputText
