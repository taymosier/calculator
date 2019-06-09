import React, { Component } from 'react';
import { Col} from 'reactstrap';

export class CalculatorDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      previousValue: 0,
      currentValue: 0,
      displayedValue: this.concatenateExpression(this.props.value),
      theme: this.props.theme
    }
  }

  componentDidUpdate(){
    let expression = this.concatenateExpression(this.props.value);
    if(this.state.displayedValue !== expression){
      this.setState({
        displayedValue: this.concatenateExpression(this.props.value)
      })
    }
  }

  concatenateExpression(expression){
    let displayedExpression = "";
    for(let item in expression){
      displayedExpression = displayedExpression.concat(expression[item])
    }
    return displayedExpression;
  }
  render(){
    return(
        <Col
          className={`container-result ${this.props.theme} base`}
          xl={{size: 12, offset: 0}}
          lg={{size: 12, offset: 0}}
          md={{size: 12, offset: 0}}
          sm={{size: 12, offset: 0}}
          xs={{size: 12, offset: 0}}
        >
          {this.state.displayedValue}
        </Col>
    )
  }
}
