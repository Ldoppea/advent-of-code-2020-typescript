import { readFileSync } from 'fs';

export function readLines(filePath: string): string[] {
  let test = readFileSync(filePath, 'utf-8');
  let test2 = test.split('\n');

  return test2;
}
  