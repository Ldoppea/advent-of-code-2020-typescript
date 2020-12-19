interface Rule {
  ruleRaw: string,
  ruleIndex: number,
  ruleString: string,
  ruleRegex: string
}

const getRulesAndData = (input: string[]) => {
  let rules = input.filter(line => line !== '' && line.includes(':'));
  let data = input.filter(line => line !== '' && !line.includes(':'));

  return { 
    rules,
    data
  }
}

export function parseRules(rules: string[]): Rule[] {
  return rules.map(rule => {
    const [ruleIndex, ruleString] = rule.split(': ');

    return {
      ruleRaw: rule,
      ruleIndex: parseInt(ruleIndex),
      ruleString,
      ruleRegex: ''
    }
  });
}

export function transformRuleToRegex(rule: Rule, rules: Rule[]): string {
  const ruleString = rule.ruleString;

  // Part 2 handle loop
  if (rule.ruleIndex === 8 && rule.ruleString.includes('8')) {
    // f(x) = x | x f(x) means a succession of 1 or more 'x'
    // ex: x
    // ex: xx
    // ex: xxx
    // ex: xxxx
    const correspondingRule = rules.find(rule => rule.ruleIndex === 42)!;
    const regex = '(' + transformRuleToRegex(correspondingRule, rules) + ')';

    return `${regex}+`;
  } else if (rule.ruleIndex === 11 && rule.ruleString.includes('11')) {
    // f(x, y) = xy | x f(xy) y means a succession of 1 or more 'x' then 1 or more 'y' but with same number of each
    // ex: xy
    // ex: xxyy
    // ex: xxxyyy
    // ex: xxxxyyyy
    const correspondingRule1 = rules.find(rule => rule.ruleIndex === 42)!;
    const regex1 = '(' + transformRuleToRegex(correspondingRule1, rules) + ')';

    const correspondingRule2 = rules.find(rule => rule.ruleIndex === 31)!;
    const regex2 = '(' + transformRuleToRegex(correspondingRule2, rules) + ')';

    const case1 = `(${regex1}{1}${regex2}{1})`;
    const case2 = `(${regex1}{2}${regex2}{2})`;
    const case3 = `(${regex1}{3}${regex2}{3})`;
    const case4 = `(${regex1}{4}${regex2}{4})`;

    return `((${case1})|(${case2})|(${case3})|(${case4}))`;
  } 
  // Part 1
  else {
    const regex = ruleString
      .split(' | ')
      .map(rulePart => {
        const partRegex = rulePart
          .split(' ')
          .map(ruleIndex => {
            const correspondingRule = rules.find(rule => rule.ruleIndex === parseInt(ruleIndex))!;
            
            if(correspondingRule.ruleString.includes('"')) {
              return correspondingRule.ruleString.replace(/\"/gi, '');
            } else {
              return '(' + transformRuleToRegex(correspondingRule, rules) + ')'
            }
          })
          .join('')
  
        return '(' + partRegex + ')';
      })
      .join('|');
  
    return regex;
  }

}

export function getRule0ToRegex(rules: Rule[]): string {
  const rule0 = rules.find(rule => rule.ruleIndex === 0)!;

  const regex = transformRuleToRegex(rule0, rules)

  return regex;
}

export function getNumberOfMatchingLines(input: string[]): number {
  const { rules, data } = getRulesAndData(input)

  const regexStr = '^' + getRule0ToRegex(parseRules(rules)) + '$';

  const regex = RegExp(regexStr);

  const matchingLines = data.filter(line => {
    return regex.test(line);
  });

  return matchingLines.length
}