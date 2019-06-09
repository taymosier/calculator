export function negateValue(value){
  return value*(-1);
}

export function add(firstAddend, secondAddend) {
  return parseFloat(firstAddend) + parseFloat(secondAddend)
}

export function subtract(minuend, subtrahend){
  return minuend - subtrahend;
}

export function multiply(multiplicand, multiplier){
  let result = parseFloat(multiplicand)*parseFloat(multiplier);
  if(result%1 !== 0){
    return parseFloat(result)
  }
  return result;
}

export function divide(dividend, divisor){
  let result = dividend/divisor;
  if(result%1 !== 0){
    return parseFloat(result)
  }
  return result;
}
