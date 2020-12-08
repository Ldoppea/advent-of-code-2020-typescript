export class BagContent {
  public bagColor: string;
  public count: number;

  constructor(bagColor: string, count: number) {
    this.bagColor = bagColor;
    this.count = count;
  }
}

export class BagRule {
  public bagColor: string;
  public subBags: BagContent[];

  constructor(bagColor: string, subBags: BagContent[]) {
    this.bagColor = bagColor;
    this.subBags = subBags;
  }
}

export function parseRuleRegex(rule: string): BagRule {
  const bagRegex = '([\\w\\s]+) bags contain';
  const contentRegex = '(?:(?:([0-9]+) ([\\w\\s]+)) bags*[\\,\\.])*';
  const fullRegex = `${bagRegex} ${contentRegex}\\s*${contentRegex}\\s*${contentRegex}\\s*${contentRegex}`;

  const [_, bagColor, ...subBags] = rule.match(fullRegex)!;

  const bagContents = [];
  for(let i = 0; i < subBags.length; i += 2) {
    if(subBags[i] !== undefined) {
      const count = parseInt(subBags[i]);
      const color = subBags[i + 1];
      bagContents.push(new BagContent(color, count))
    }
  }

  return new BagRule(bagColor, bagContents);
}

export function parseRule(rule: string): BagRule {
  const ruleWithoutBagWord = rule.replace(/ bags*/g, '').replace(/\./g,'');
  const [bagColor, content] = ruleWithoutBagWord.split(' contain ');

  let subBagsRules: BagContent[] = [];

  if(content !== 'no other') {
    subBagsRules = content
      .split(', ')
      .map(rule => {
        const [count, ...colorParts] = rule.split(' ');
        const color = colorParts.join(' ');
        return new BagContent(color, parseInt(count));
      })
  }

  return new BagRule(bagColor, subBagsRules);
}

export function parseRulesRegex(rules: string[]): BagRule[] {
  return rules.map(rule => parseRuleRegex(rule));
}

export function parseRules(rules: string[]): BagRule[] {
  return rules.map(rule => parseRule(rule));
}
