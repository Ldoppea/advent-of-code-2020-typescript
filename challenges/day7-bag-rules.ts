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

export function parseRules(rules: string[]): BagRule[] {
  return rules.map(rule => parseRule(rule));
}