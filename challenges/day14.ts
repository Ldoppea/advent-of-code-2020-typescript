import { sum } from "../helpers/math";

const MASK_PREFIX = 'mask = ';
const MEM_PREFIX = 'mem[';

type BitConverter = (bit: string) => string;
interface Converter {
  convert0: BitConverter,
  convert1: BitConverter,
  convertX: BitConverter
}

interface MemInstruction {
  memoryAddress: string,
  value: number
}

const getMask = (line: string): string => {
  return line.substring(MASK_PREFIX.length);
}

const getMemInstruction = (line: string): MemInstruction => {
  const [instruction, valueStr] = line.split(' = ');
  const memoryAddress = instruction.substring(MEM_PREFIX.length, instruction.length - 1);
  const value = parseInt(valueStr);

  return {
    memoryAddress,
    value
  }
}

const normalizeStringWithZero = (binaryString: string, size: number) => {
  const fillers = new Array(size - binaryString.length).fill('0').join('');

  return fillers + binaryString;
}

const getMaskedBits = (value: number, mask: String, converter: Converter): string => {
  let bits = normalizeStringWithZero(value.toString(2), mask.length);

  const maskedBits = bits
    .split('')
    .map((bit, index) => {
      const bitMask = mask[index];
      if(bitMask === '0') {
        return converter.convert0(bit);
      } else if (bitMask === '1') {
        return converter.convert1(bit);
      } else {
        return converter.convertX(bit);
      }
    });

  return maskedBits.join('');
}

const getCombination = (maskedMemoryAddress: string, combinationIndex: number, numberOfX: number) => {
  const bitsArray = normalizeStringWithZero(combinationIndex.toString(2), numberOfX).split('');

  let result = maskedMemoryAddress;
  bitsArray.forEach(bit => {
    result = result.replace('X', bit.toString())
  });

  return parseInt(result, 2);
}

export function getAddressesForMask(memoryAddress: number, mask: string): number[] {
  const maskedMemoryAddress = getMaskedBits(memoryAddress, mask, {
    convert0: (bit) => bit,
    convert1: (_) => '1',
    convertX: (_) => 'X',
  });

  const numberOfX = maskedMemoryAddress.split('').filter(bit => bit === 'X').length;
  const numberOfCombinations = Math.pow(2, numberOfX);

  let memoryAddresses = [];
  for (let i = 0; i < numberOfCombinations; i++) {
    memoryAddresses.push(getCombination(maskedMemoryAddress, i, numberOfX));
  }

  return memoryAddresses;
};

interface Instructions {
  [id: string]: number;
}

type IntructionFiller = (instructions: Instructions, mask: string, memInstruction: MemInstruction) => void;

const getInstructions = (input: string[], initialMask: string, instructionFiller: IntructionFiller): Instructions => {
  let currentMask = initialMask;

  let instructions: Instructions = {};

  input.forEach(line => {
    if(line.startsWith(MASK_PREFIX)) {
      currentMask =  getMask(line);
    } else if (line.startsWith(MEM_PREFIX)) {
      const memoryInstruction = getMemInstruction(line);

      instructionFiller(instructions, currentMask, memoryInstruction)     
    }
  });

  return instructions;
}

export function getSumInMemory(input: string[]): number {
  const initialMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

  const instructions = getInstructions(input, initialMask, (instructions, currentMask, memoryInstruction) => {
    const { memoryAddress, value } = memoryInstruction;

    const maskedValue = getMaskedBits(value, currentMask, {
      convert0: (_) => '0',
      convert1: (_) => '1',
      convertX: (bit) => bit,
    });

    instructions[memoryAddress] = parseInt(maskedValue, 2);   
  })

  return sum(Object.values(instructions));
}

export function getSumInMemoryV2(input: string[]): number {
  const initialMask = '000000000000000000000000000000000000';

  const instructions = getInstructions(input, initialMask, (instructions, currentMask, memoryInstruction) => {
    const { memoryAddress, value } = memoryInstruction;

    const memoryAddresses = getAddressesForMask(parseInt(memoryAddress), currentMask)

    memoryAddresses.forEach(address => {
      instructions[address] = value;
    }) 
  })

  return sum(Object.values(instructions));
}