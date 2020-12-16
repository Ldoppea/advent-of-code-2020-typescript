import { multiply, sum } from "../helpers/math";

interface MinMax {
  min: number,
  max: number,
}
interface Rule {
  name: string,
  minMax1: MinMax,
  minMax2: MinMax,
}
interface DataSet {
  rules: Rule[],
  ticket: number[],
  nearbyTickets: number[][]
}
interface RuleWithValidIndexes {
  rule: Rule,
  validIndexes: number[],
  finalIndex: number
}

const extractRule = (line: string): Rule => {
  const [name, ranges] = line.split(': ');

  const [minMax1, minMax2] = ranges.split(' or ');

  const [min1, max1] = minMax1.split('-');
  const [min2, max2] = minMax2.split('-');

  return {
    name,
    minMax1: {
      min: parseInt(min1),
      max: parseInt(max1),
    },
    minMax2: {
      min: parseInt(min2),
      max: parseInt(max2),
    }
  }
}

const extractDataset = (input: string[]): DataSet => {
  let rules: Rule[] = [];
  let ticket: number[] = [];
  let nearbyTickets: number[][] = [];

  let allRulesSet = false;
  let ticketSet = false;
  for(let line of input) {
    if (line === '') {
      continue;
    }

    if (line.startsWith('your ticket:')) {
      allRulesSet = true;
      continue;
    }

    if (line.startsWith('nearby tickets:')) {
      ticketSet = true;
      continue;
    }

    if(!allRulesSet) {
      const rule = extractRule(line);
      rules.push(rule);
    } else if (!ticketSet) {
      ticket = line.split(',').map(value => parseInt(value));
    } else {
      let ticketDetails = line
        .split(',')
        .map(value => parseInt(value));

      nearbyTickets.push([...ticketDetails]);
    }
  }

  return  {
    rules,
    ticket,
    nearbyTickets
  }
}

const isValueValid = (value: number, rule: Rule) => {
  return value >= rule.minMax1.min && value <= rule.minMax1.max
      || value >= rule.minMax2.min && value <= rule.minMax2.max;
}

export function getTicketScanningErrorRate(input: string[]): number {
  const dataSet = extractDataset(input);

  const invalidValues = dataSet.nearbyTickets.flatMap(nearbyTicket => {
    return nearbyTicket.filter(value => {
      return !dataSet.rules.some(rule => {
        return value >= rule.minMax1.min && value <= rule.minMax1.max
            || value >= rule.minMax2.min && value <= rule.minMax2.max;
      });
    });
  });

  return sum(invalidValues);
}

export function getTicketRulesPosition(input: string[]): number {
  const dataSet = extractDataset(input);

  const validNearbyTickets = dataSet.nearbyTickets.filter(nearbyTicket => {
    return nearbyTicket.every(value => {
      return dataSet.rules.some(rule => {
        return value >= rule.minMax1.min && value <= rule.minMax1.max
            || value >= rule.minMax2.min && value <= rule.minMax2.max;
      });
    });
  });

  const numberOfRules = dataSet.rules.length;
  const rulesValidIndexes = dataSet.rules
    .map(rule => {
      let validIndexes = [];
      for (let i = 0; i < numberOfRules; i++) {
        const matchAll = validNearbyTickets.every(nearbyTicket => isValueValid(nearbyTicket[i], rule));

        if (matchAll) {
          validIndexes.push(i);
        }
      }

      return {
        rule,
        validIndexes
      };
    })
    .sort((ruleA, ruleB) => ruleA.validIndexes.length - ruleB.validIndexes.length);

  let rulesValidIndexFixed: RuleWithValidIndexes[] = [];
  while(rulesValidIndexes.length > 0) {
    const lastRule = rulesValidIndexes.pop()!;

    const finalIndex = lastRule.validIndexes.find(index => rulesValidIndexes.every(otherRules => !otherRules.validIndexes.includes(index)));

    rulesValidIndexFixed.push({
      rule: lastRule.rule,
      finalIndex: finalIndex || 0,
      validIndexes: lastRule.validIndexes
    });
  }

  const departureValues = rulesValidIndexFixed
    .filter(rule => rule.rule.name.startsWith('departure'))
    .map(rule => rule.finalIndex)
    .map(index => dataSet.ticket[index]);

  return multiply(departureValues);
}