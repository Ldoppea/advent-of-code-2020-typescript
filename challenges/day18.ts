import { sum } from "../helpers/math";

const ADDITION = '+';
const MULTIPLICATION = '*';
const OPEN_GROUP = '(';
const CLOSE_GROUP = ')';

// an Operand is the combination of an operator and a 'right operand'
// ex: + 1        -> operator is '+', operandLeaf is '1'
// ex: * (1 + 3)  -> operator is '+', operandGroup is '(1 + 3)'
// a combination of operands is a formula (in following sample each operand is surrounded by ||)
// ex: 1 + 3 * 6  -> (+1) (+3) (*6)
// ex: 1 * (3 + 6)  -> (+1) (*(+3) (+6))
interface Operand {
  numberOfOperands: number,
  operator: string,
  operandLeaf?: number,
  operandGroup: Operand[],
}

type Calculator = (operands: Operand[]) => number;

export function splitFormula(formula: string): string[] {
  const openGroupRegex = /\(/gi;
  const closeGroupRegex = /\)/gi;
  return formula
    .replace(openGroupRegex, '( ')
    .replace(closeGroupRegex, ' )')
    .split(' ');
}

export function groupFormula(formula: string[]): Operand[] {
  let localFormula = [...formula];
  let result: Operand[] = [];
  let numberOfOperands = 0;
  let currentOperator = ADDITION;

  while(localFormula.length > 0) {
    numberOfOperands++;
    let current = localFormula.shift()!;

    if (current === ADDITION || current === MULTIPLICATION) {
      currentOperator = current;
      continue;
    }

    if (current === OPEN_GROUP) {
      const group = groupFormula(localFormula);
      const handledOperands = sum(group.map(g => g.numberOfOperands)) + 1; // don't forget closing parenthesis
      numberOfOperands += handledOperands;
      result.push({
        operator: currentOperator,
        operandLeaf: undefined,
        operandGroup: group,
        numberOfOperands: numberOfOperands
      });
      numberOfOperands = 0;
      for(let i = 0; i < handledOperands; i++) {
        localFormula.shift()
      };
      continue;
    }
    
    if (current === CLOSE_GROUP) {
      break;
    }

    result.push({
      operator: currentOperator,
      operandLeaf: parseInt(current),
      operandGroup: new Array<Operand>(),
      numberOfOperands
    });
    numberOfOperands = 0;
  }

  return result;
}

const applyOperand = (accumulator: number, operator: string, value: number) => {
  let result = accumulator;
  if (operator === ADDITION) {
    result += value;
  } else if (operator === MULTIPLICATION) {
    result *= value;
  }

  return result;
}

export function calculateForOperators(operands: Operand[], operators: string[], calculator: Calculator) : void {
  let index = 0;

  while (index < operands.length) {
    let currentOperand = operands[index];
    const indexNext = index + 1;

    if (currentOperand.operandLeaf === undefined) {
      currentOperand.operandLeaf = calculator(currentOperand.operandGroup)
    }

    let nextOperand = operands[indexNext];

    if (nextOperand) {
      if (nextOperand.operandLeaf === undefined) {
        nextOperand.operandLeaf = calculator(nextOperand.operandGroup)
      }
  
      if (operators.includes(nextOperand.operator)) {
        currentOperand.operandLeaf = applyOperand(currentOperand.operandLeaf!, nextOperand.operator, nextOperand.operandLeaf!);
        operands.splice(indexNext, 1);
        index--;
      }
    }
    index++;
  }
}

const applyCalculator = (formula: string, calculator: Calculator): number => {
  const localFormula = splitFormula(formula);
  
  const groups = groupFormula(localFormula);

  const result = calculator(groups);

  return result;
}


/************/
/** PART 1 **/
/************/
export function calculateWithGroups(operands: Operand[]): number {
  
  calculateForOperators(operands, [ADDITION, MULTIPLICATION], calculateWithGroups);

  return operands[0].operandLeaf!;
}

export function calculate(formula: string): number {
  return applyCalculator(formula, calculateWithGroups);
}

export function calculateAllAndSum(input: string[]): number {
  const results = input
    .map(line => calculate(line));

  return sum(results);
}


/************/
/** PART 2 **/
/************/
export function calculateWithGroupsAdvanced(operands: Operand[]) : number {
  calculateForOperators(operands, [ADDITION], calculateWithGroupsAdvanced);
  calculateForOperators(operands, [MULTIPLICATION],calculateWithGroupsAdvanced);

  return operands[0].operandLeaf!;
}

export function calculateAdvanced(formula: string): number {
  return applyCalculator(formula, calculateWithGroupsAdvanced);
}

export function calculateAllAndSumAdvanced(input: string[]): number {
  const results = input
    .map(line => calculateAdvanced(line));

  return sum(results);
}