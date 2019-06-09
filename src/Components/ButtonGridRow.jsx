import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { CalculatorButton } from './CalculatorButton';

export class ButtonGridRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeButton: this.props.activeButton,
      buttons: this.props.buttons,
      inputHandler: this.props.inputHandler,
      theme: this.props.theme
    }
  }

  componentDidUpdate(){
    if(this.state.activeButton !== this.props.activeButton){
      this.setState({
        activeButton: this.props.activeButton
      })
    }
    if(this.state.theme !== this.props.theme && this.props.theme !== undefined){
      this.setState({
        theme: this.props.theme
      })
    }
  }

  render(){
    let buttonId = 0;
    let buttons = this.state.buttons.map(button => (
      <CalculatorButton activeButton={this.state.activeButton} theme={this.state.theme} key={buttonId++} button={button} inputHandler={this.state.inputHandler}/>
    ))
    return(
      <Row className="row-buttons">
        {buttons}
      </Row>
    )
  }
}
