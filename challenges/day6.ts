const removeDuplicates = (form: string): string[] => {
  return [...new Set(form)];
}

const fuseForm = (form: string[]): string => {
  return form.join('');
}

const groupByForm = (input: string[]): string[][] => {
  let forms: string[][] = [[]];

  for (let line of input) {
    if(line.length == 0) {
      forms.push([]);
    } else {
      forms[forms.length - 1].push(line);
    }
  }

  return forms;
}

const groupByLetter = (answers: string) => {
  let groupedAnswers: {[letter: string]: string} = {};

  for (let letter of answers) {
    groupedAnswers[letter] = groupedAnswers[letter] || '';
    groupedAnswers[letter] += letter;
  }

  return groupedAnswers;
} 

const countAnswers = (form: string[]) => {
  const awnsers = groupByLetter(form.join(''));
  const count = form.length;
  return {
    count,
    awnsers,
    answersAll: Object.entries(awnsers).filter(([_, value]) => value.length == count).map(([key, _]) => key)
  }
}

export function getAnyoneYesQuestions(input: string[]): number {
  let forms = groupByForm(input).map(fuseForm);

  let formsAnyoneYesCount = forms.flatMap(removeDuplicates).length;

  return formsAnyoneYesCount;
}

export function getEveryoneYesQuestions(input: string[]): number {
  let forms = groupByForm(input).map(countAnswers);

  let allYes = forms.flatMap(form => form.answersAll).length;

  return allYes;
}
