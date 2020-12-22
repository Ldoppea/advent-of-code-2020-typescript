import { readFileSync } from 'fs';

export function readLines(filePath: string): string[] {
  let fileContent = readFileSync(filePath, 'utf-8');
  let fileLines = fileContent.split('\n');

  return fileLines;
}

export function readFile(filePath: string): string {
  let fileContent = readFileSync(filePath, 'utf-8');

  return fileContent;
}
  