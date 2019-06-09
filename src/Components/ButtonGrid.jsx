import React, { Component } from 'react';
import { ButtonGridRow } from './ButtonGridRow';
import { buttons } from '../buttons.js'


export class ButtonGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeButton: this.props.activeButton,
      rows: this.splitRows(buttons),
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

  splitRows(buttons){
    let rows = [];
    let row;
    while(buttons.length >= 4){
      row = buttons.splice(0,4);
      rows.push(row)
    }
    if(buttons.length > 0){
      rows.push(buttons)
    }
    for(let item in rows){
      console.log(rows[item])
    }
    return rows;
  }
  render(){
    console.log(this.state.rows)
    let gridRowKey = 0;
    let rows = this.state.rows.map(row => (
      <ButtonGridRow activeButton={this.state.activeButton} theme={this.state.theme} key={gridRowKey++} buttons={row} inputHandler={this.state.inputHandler}/>
    ))
    return(
      rows
    )
  }
}
