import React, { Component } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { CalculatorDisplay } from './Components/CalculatorDisplay';
import { ButtonGrid } from './Components/ButtonGrid';
const operations = require('./operations.js');


class Calculator extends Component {
//******UI Generation**************************

  constructor(props){
    super(props);
    this.state = {
      activeButton: null,
      expression: {
        firstValue: "0",
        operator: "",
        secondValue: ""
      },
      theme: "theme-1"
    }
    this.handleInput = this.handleInput.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  render(){
    return (
      <Container className="calculator" fluid={true}>
        <Button className="toggle-theme" onClick={this.toggleTheme}>Toggle Theme</Button>
        <Row className="top-row">
          <CalculatorDisplay value={this.state.expression} theme={this.state.theme}/>
        </Row>
        <Row className="bottom-row">
          <Col className="container-buttons">
            <ButtonGrid activeButton={this.state.activeButton} theme={this.state.theme} inputHandler={this.handleInput}/>
          </Col>
        </Row>
      </Container>
    );
  }

//******end of UI generation functions**************************


//******Input handlers

  toggleTheme(){
    this.state.theme === "theme-1" ? this.setState({"theme": "theme-2"}) : this.setState({"theme": "theme-1"})
  }

  handleInput(button){
    console.log(button)
    let newExpression;
    let expressiveState = this.getExpressiveState(); // will return "empty", "firstValueOnly", "operatorPresent", "complete"
    expressiveState !== null ? newExpression = this.determineInputHandlerType(button, expressiveState) : newExpression = null
    if(newExpression !== null && newExpression !== undefined){
      this.setState({
        activeButton: button.value,
        expression: newExpression
      })}} //root function for handling all button input

  determineInputHandlerType(button, expressiveState){
    switch(`${button.type}`){
      case "function":
        return this.handleCalculatorFunctionInput(button.value, expressiveState)
      case "operator":
        return this.handleoperatorInput(button, expressiveState);
      case "number":
        return this.handleNumberInput(button.value, expressiveState);
      default:
        return null;
    }
  }

  handleCalculatorFunctionInput(calculatorFunction, expressiveState){ //returns object with properties [firstValue, operator, secondValue]
    let currentExpression = this.state.expression;
    console.log(currentExpression)
    switch(`${calculatorFunction}`){
      case "clear":
        return {"firstValue":"0", "operator": "", "secondValue": ""}
      case "negate":
        return this.negateExpressionValue(currentExpression, expressiveState)
      case "percent":
        return this.convertExpressionValueToPercent(currentExpression, expressiveState)
      case "decimate":
        return this.decimateExpressionValue(currentExpression, expressiveState)
      default:
        break
    }
  }
  handleNumberInput(number, expressiveState){
    let value = number.toString();
    switch(expressiveState){
      case "empty":
        return this.appendToFirstValue(value);
      case "firstValueOnly":
        if(this.state.expression.firstValue === "0"){
          return this.replaceFirstValue(value);
        }
        return this.appendToFirstValue(value);
      case "operatorPresent":
        return this.replaceSecondValue(value);
      case "complete":
        if(this.state.expression.secondValue === "0"){
          return this.replaceSecondValue(value);
        }
        return this.appendToSecondValue(value);
      default:
        break;}} //should return object to replace this.state.expression
  handleoperatorInput(operator, expressiveState){
    switch(expressiveState){
      case "empty":
        return this.updateoperator(operator);
      case "firstValueOnly":
        return this.updateoperator(operator);
      case "operatorPresent":
        return this.updateoperator(operator);
      case "complete":
        return this.replaceEquation(operator);
      default:
        console.log("expression state case for handle operator input was not found")
        break;}} //should return object to replace this.state.expression
  handleDecimalInput(isFollowing, expressiveState){
      switch(expressiveState){
        case "empty":
          return this.appendToFirstValue(".");
        case "firstValueEntered":
          return this.appendToFirstValue(".");
        case "operatorPresent":
          return this.appendToSecondValue("0.");
        case "complete":
          return this.appendToSecondValue(".");
        default:
          break;}}//if the displayed value ends in '.', returns null, otherwise checks to see if the displayed value ends with a operator, a zero, or number
  determineOperation(symbol){
    switch(`${symbol}`){
      case "/":
        return "divide";
      case "x":
        return "multiply";
      case "+":
        return "add";
      case "-":
        return "subtract";
      default:
        return "error in determineOperation()";
    }
  }

//******end of input handlers**************************


//******expression validator functions *********************************

  validateOneOrLessDecimalIn(stringValue){
    return /[.]{1}/gm.test(stringValue)
  }
  expressionContainsoperator(expressionString){
    return /[x\\+-]+/gm.test(expressionString)
  }
  getExpressiveState(){
    let firstValueEntered = this.state.expression.firstValue !== "";
    let operatorPresent = this.state.expression.operator !== "";
    let secondValueEntered = this.state.expression.secondValue !== "";

    if(!firstValueEntered){ return "empty" }
    if(firstValueEntered && !operatorPresent){ return "firstValueOnly" }
    if(firstValueEntered && operatorPresent && !secondValueEntered ){ return "operatorPresent" }
    if(firstValueEntered && operatorPresent && secondValueEntered){ return "complete" }
  }

//******end of expression validator functions**************************


//******expression state manipulator functions**************************

  updateoperator(input){
    let newExpression = this.state.expression;
    newExpression.operator = input.symbol;
    return newExpression;
  } //returns object

  appendToFirstValue(input){ //input === typeOf(string), returns object
    let expression = this.state.expression;
    expression.firstValue = expression.firstValue+input;
    return expression;
  }

  appendToSecondValue(input){
    let expression = this.state.expression
    expression.secondValue = expression.secondValue+input;
    return expression;
  } //returns object

  replaceFirstValue(input){
    let newExpression = this.state.expression;
    newExpression.firstValue = input;
    return newExpression;} //returns object

  replaceSecondValue(input){
    let newExpression = this.state.expression;
    newExpression.secondValue = input;
    return newExpression;
  } //returns object

  replaceEquation(input){return this.executeCurrentExpression(input)} //returns object

  executeCurrentExpression(newOperator){ //
    let newExpression;
    if(newOperator !== undefined){
      newExpression = {
        firstValue: `${parseFloat(this.performOperation(this.state.expression)).toFixed(2)}`,
        operator: newOperator.symbol,
        secondValue: ""
      };
      return newExpression
    }
    newExpression = {
      firstValue: `${parseFloat(this.performOperation(this.state.expression)).toFixed(2)}`,
      operator: "",
      secondValue: ""
    }
    return newExpression;
  }

  performOperation(expression){ //returns a single number
    switch(this.determineOperation(expression.operator)){// parameter should be string, "/", "x", "+", "-"
      case "divide":
        return operations.divide(expression.firstValue, expression.secondValue)
      case "multiply":
        return operations.multiply(expression.firstValue, expression.secondValue)
      case "add":
        return operations.add(expression.firstValue, expression.secondValue)
      case "subtract":
        return operations.subtract(expression.firstValue, expression.secondValue)
      default:
        console.log("unable to determine operation")
        return "";
    }
  } //returns object with properties [firstValue, operator, secondValue]

  convertExpressionValueToPercent(expression, expressiveState){
    switch(expressiveState){
      case "firstValueOnly":
        return {
          "firstValue": `${parseFloat(operations.divide(expression.firstValue, "100")).toFixed(2)}`,
          "operator": expression.operator,
          "secondValue": expression.secondValue
        }
      case "complete":
        return {
          "firstValue": expression.firstValue,
          "operator": expression.operator,
          "secondValue": `${parseFloat(operations.divide(expression.secondValue, "100")).toFixed(2)}`
        }
      default:
        return null;
    }
  }
  decimateExpressionValue(currentExpression, expressiveState){ //should return object
    switch(expressiveState){
      case "empty":
        return this.appendToFirstValue("0.");
      case "firstValueOnly":
        if(this.validateOneOrLessDecimalIn(currentExpression.firstValue)){ //checks to see if there is already a decimal in the value
          return null;
        }
        return this.appendToFirstValue(".")
      case "operatorPresent":
        return this.appendToSecondValue("0.");
      case "complete":
        if(this.validateOneOrLessDecimalIn(currentExpression.secondValue)){
          return null;
        }
        return this.appendToSecondValue(".");
      default:
        return null;
    }
  }
  negateExpressionValue(currentExpression, expressiveState){
    let negativeValue;
    switch(expressiveState){
      case "firstValueOnly":
        negativeValue = operations.negateValue(currentExpression.firstValue)
        return this.replaceFirstValue(negativeValue)
      case "complete":
        negativeValue = operations.negateValue(currentExpression.secondValue)
        return this.replaceSecondValue(negativeValue)
      default:
        return null
  }}

//******end of expression state manipulator functions**************************

}

export default Calculator;
