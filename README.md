This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#	Code Overview

  **Disclaimer** The calculation logic was optional for this assignment, but since I am more accustomed to creating full stack applications, I believe anyone looking at this
                 project will have a better idea of my abilities as a developer if I provide a more complete solution.

## UI Structure

  The UI was created using the React.js framework, Bootstrap, and the Reactstrap npm package. I chose this framework mainly because of my familiarity with using it. I believed it to be suitable for this project since the dynamic state changes in the React components would make it simple to reflect changes in calculations and theme styling.

  I took a straightforward approach to reflecting theme changes in the UI by simply creating two CSS classes "theme-1" and "theme-2". I then added a Toggle Theme button
  which would toggle the Calculator component's "theme" state attribute. I generated the calculator buttons dynamically by storing them as JSON objects in a separate file -
  buttons.js - and then imported those objects into my ButtonGrid component. This approach allowed me to account for marginal differences in the buttons. For example, I gave each
  button a "columns" attribute which allowed me to specify the size of each button without adding extra code to my core UI components. It also allowed me to easily modify the theme of the buttons by assigning each button object a "class" attribute, which is added dynamically when a CalculatorButton component is rendered.

  By taking this approach I was able to accomplish all the core requirements of the assignment with the below UI component structure:
   _________________________________________________
    <Calculator>
    |___ <CalculatorDisplay />
    |___ <ButtonGrid />
        |___ [<ButtonGridRow />] {1..n}             // as the code is written now, an infinite number of ButtonGridRow components could be generated
            |__ [<CalculatorButton />] {n<=4}       // as the code is written now, a row will contain no more than 4 CalculatorButton components
    _______________________________________________

  <Calculator />: Main Component. All button inputs are passed to this component

  <CalculatorDisplay />: Displays a concatenated version of the main <Calculator />'s expression state object

  <ButtonGrid />: Contains all the buttons they user can interact with. Button objects are stored in buttons.js and passed to child components [ <ButtonGridRow /> ]

  <ButtonGridRow />: Contains a subset of buttons [ <CalculatorButton /> ]

  <CalculatorButton />: Is passed an inputHandler function that passes the component state back to the main <Calculator /> when triggered. Consists of <Button /> component
                        and <Col /> container Component

#	Technical Reasoning
  While the current inputHandler function only takes in a button state object as a parameter, it could be refactored to take in an expression, parse it, and handle that input with
  minimal refactoring to the rest of the function logic.

  I attached a handler to each button that passed the triggered button's state to an inputHandler function bound to the main parent <Calculator /> component as a means
  to respond to user interaction;

  I built this calculator with the intention of achieving maximum functionality while maintaining minimal structure. In order to do this, I needed
  to limit the number of possible edge cases. The first step was to limit inputs to those that were arithmetically legal.
  -- Defining inputs
    I simplified button inputs into 3 types - number, operator, and function
    -- Number: [0-9].
       For simplicity's sake, some if logic checks were implemented in my input handlers to handle special cases for 0 rather than define it  as its own case
    -- operator: [/,X,+,-,=]
       Nothing special here, specific functions [add(), multiply(), etc.] handle individual cases. those functions are stored separately in operations.js
    -- function [AC, -/+, %, .]
       Any button input that changes the way values are expressed [1 vs 1.0, 6*7 vs. 42,] or directly manipulates an expression value [negating values or converting to percents]

   -- Defining expression state
   The next step was to limit the definition of the expression's state. My main concern regarding logical complexity at this step was the mathematical order of operations. I decided to negate this issue by limiting the calculator to only one operation at a time

   "expression": {      <--- <Calculator /> state attribute
     firstValue:  "X"
     operator:    "Y"
     secondValue: "Z"
   }

   This allowed me to define any expression as belonging to one of the four following cases:

                      __ 1stValue__| __ operator__|__ 2ndValue __
    [empty]                 -      |       -     |       -  
    [1stValueOnly]          X      |       -     |       -
    [operatorPresent]       X      |       Y     |       -
    [complete]              X      |       Y     |       Z

  I implemented the logic in a way that if the expression already contained an operator and the user pressed one of the operator buttons, one of two things can occur.  The calculator will replace the existing operator in the expression if a second value is not present in the expression. If it is a complete expression, it will evaluate the existing expression, replace the expression's first value with that value, and replace the operator with the one the user just entered.

  With the calculator buttons and expression states now limited to 12 possible cases, my handleInput function now takes in the button input, gets the current expression state case, and calls a function based on the button type. Once these type-based handlers are called, we have to consider even fewer edge cases and can generate a return value based on switch statements consisting of only four cases.  

  TLDR: [receive input] -> [get state of current expression] -> [call handler specific to button type] -> [generate new expression] -> [update UI]

#	Trade Offs
  I made several trade offs in my code for the sake of keeping the logic implementation straightforward and readable. The most intentional performance trade off I made was storing values as strings. This method, combined with updating the entire expression state object each time a value changed, involves a lot of parsing of strings to floats and vice-versa.

  I also made the trade off of performing very minimal testing. If there are any errors in my input logic, the functions will simply return null and no changes will be reflected in the calculator's UI. If I were to make this app more substantial, I would add try/catch statements to handle irregular or unexpected input.
