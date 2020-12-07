import { BagRule, parseRules } from './day7-bag-rules';

const SHINY_GOLD = 'shiny gold';

const filterByBagContent = (bagName: string) => (bagRule: BagRule) => bagRule.subBags.map(subBag => subBag.bagColor).includes(bagName);

export function countBagsContainingShinyGold(input: string[]): number {
  const bagRules = parseRules(input);

  let bagColors = bagRules
    .filter(filterByBagContent(SHINY_GOLD))
    .map(bagRule => bagRule.bagColor);

  let currentLength = 0;

  while(bagColors.length != currentLength) {
    currentLength = bagColors.length;

    for(let bagColor of bagColors) {
      const newBagColors = bagRules
        .filter(filterByBagContent(bagColor))
        .map(bagRule => bagRule.bagColor);

      bagColors = [...new Set([...bagColors, ...newBagColors])];
    }
  }

  return bagColors.length;
}

const countSubBagsRecursive = (bagColor: string, bagRules: BagRule[]) : number => {
  let currentBag = bagRules.find(bagRule => bagRule.bagColor === bagColor);

  let subBagCount = 0;

  for (let subBagContent of currentBag!.subBags) {
    subBagCount += subBagContent.count * (1 + countSubBagsRecursive(subBagContent.bagColor, bagRules));
  }

  return subBagCount;
}

export function countBagsInsideShinyGold(input: string[]): number {
  const bagRules = parseRules(input);

  return countSubBagsRecursive(SHINY_GOLD, bagRules); //?
}
