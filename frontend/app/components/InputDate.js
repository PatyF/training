import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

class InputDate extends React.Component {

  onChange = (event) => {
    var value = (event.target.value.split('')
                .filter((i)=> {return '1234567890'.search(i) >= 0})
                .join('')
                + 'XXXXXXXXXX').substring(0,8)
    var day = value.substring(0,2)
    var month = value.substring(2, 4)
    var year = value.substring(4, 8)
    this.props.onChange(year + '-' + month + '-' + day)
  }
  setValue(value) {
    var year = value.substring(0, 4).replace(/X/g, '')
    var month = value.substring(5, 7).replace(/X/g, '')
    var day = value.substring(8, 10).replace(/X/g, '')
    value = day
    value = value + month ? '/' + month : ''
    value = value + year ? '/' + year : ''
    return day + (month ? '/' + month: '') + (year ? '/' + year : '')
  }
  render() {
    return <FormGroup validationState={this.props.erros ? 'error' : null}>
      <ControlLabel>{this.props.label}</ControlLabel>
      <FormControl
        type="text"
        placeholder={this.props.label} value={this.setValue(this.props.value)}
        onChange={this.onChange} />
      <HelpBlock>{this.props.erros}</HelpBlock>
    </FormGroup>
  }
}

export default InputDate
