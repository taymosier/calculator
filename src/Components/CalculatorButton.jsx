import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';
import '../index.css';


export class CalculatorButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      isActive: this.props.activeButton === this.props.button.label,
      label: this.props.button.label,
      type: this.props.button.type,
      columns: this.props.button.columns,
      value: this.props.button.value,
      symbol: this.props.button.symbol !== undefined ? this.props.button.symbol : "",
      class: `${this.props.button.class}`,
      theme: `${this.props.theme}`
    }
  }

  componentDidUpdate(){
    if(this.props.activeButton === this.state.value && this.state.isActive === false){
      this.setState({
        isActive: true
      })
    } else if(this.props.activeButton !== null && this.state.isActive && this.props.activeButton !== this.state.value) {
      this.setState({
        isActive: false
      })
    }
    if(this.state.theme !== this.props.theme && this.props.theme !== undefined){
      this.setState({
        theme: this.props.theme
      })
    }
  }

  buttonIsActive(){
    if(this.state.isActive){
      return "active"
    }
    return null
  }

  render(){
    return(
      <Col
        className={`container-button ${this.state.theme} `}
        xl={this.state.columns.xl}
        lg={this.state.columns.lg}
        md={this.state.columns.md}
        sm={this.state.columns.sm}
        xs={this.state.columns.xs}
      >
        <Button className={`${this.state.class} ${this.buttonIsActive()}`} onClick={()=>{this.props.inputHandler(this.state)}}>{this.state.label}</Button>
      </Col>
    )
  }
}
