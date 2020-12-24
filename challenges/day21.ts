interface Food {
  ingredients: string[],
  allergens: string[]
}

interface AllergenWithPossibleIngredients {
  name: string,
  possibleIngredients: string[]
}

const getFoodList = (input: string[]): Food[] => {
  return input.map(line => {
    const [ingredientsString, allergensString] = line.split(' (contains ');

    const ingredients = ingredientsString.split(' ');
    const allergens = allergensString
      .substring(0, allergensString.length - 1)
      .split(', ');

    return {
      ingredients,
      allergens
    }
  });
}

const getUniqueAllergens = (foodList: Food[]) => {
  return [...new Set(foodList.flatMap(food => food.allergens))]
}

const getAllergensWithPossibleIngredients = (foodList: Food[]): AllergenWithPossibleIngredients[] => {
  const uniqueAllergens = getUniqueAllergens(foodList);

  return uniqueAllergens
    .map(allergen => {
      const foods = foodList
        .filter(food => food.allergens.includes(allergen))
        .map(food => food.ingredients);

      const uniqueIngredients = [...new Set(foods.flatMap(food => food))]

      const matchingIngredient = uniqueIngredients.filter(ingredient => foods.every(food => food.includes(ingredient)));

      return {
        name: allergen,
        possibleIngredients: matchingIngredient
      }
    })
    .sort((allergenA, allergenB) => allergenA.possibleIngredients.length - allergenB.possibleIngredients.length);

}

const getMappedAllergens = (input: string[]): AllergenWithPossibleIngredients[] => {
  const foodList = getFoodList(input);

  const uniqueAllergens = getUniqueAllergens(foodList);

  let allergensWithPossibleIngredients = getAllergensWithPossibleIngredients(foodList);

  let alreadyMappedAllergens = new Set();
  
  while (uniqueAllergens.length > alreadyMappedAllergens.size) {  
    for(let currentAllergen of allergensWithPossibleIngredients) {
      if (!alreadyMappedAllergens.has(currentAllergen.name) && currentAllergen.possibleIngredients.length === 1) {
        alreadyMappedAllergens.add(currentAllergen.name)
        
        const mappedIngredient = currentAllergen.possibleIngredients[0];
        
        allergensWithPossibleIngredients = allergensWithPossibleIngredients.map(allergen => {
          const newPossibleIngredients = allergen.name === currentAllergen.name
            ? allergen.possibleIngredients
            : allergen.possibleIngredients.filter(ingredient => ingredient !== mappedIngredient)

          return {
            ...allergen,
            possibleIngredients: newPossibleIngredients
          }
        })

        break;
      }
    }
  }

  return allergensWithPossibleIngredients;
}

export function getFoodWithoutAllergens(input: string[]): number {
  const foodList = getFoodList(input);

  const allergensWithPossibleIngredients = getMappedAllergens(input);
  const ingredientAllergens = allergensWithPossibleIngredients.flatMap(allergen => allergen.possibleIngredients)

  const occurences = foodList
    .flatMap(food => food.ingredients)
    .filter(ingredient => !ingredientAllergens.includes(ingredient))
    .length;

  return occurences;
}

export function getCanonicalDangerousIngredientList(input: string[]): string {
  const allergensWithPossibleIngredients = getMappedAllergens(input);

  const canonicalDangerousIngredientList = allergensWithPossibleIngredients
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(allergen => allergen.possibleIngredients)
    .join(',');

  return canonicalDangerousIngredientList;
}