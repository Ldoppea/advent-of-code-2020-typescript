const DIVIDER = 20201227;

export function transformSubject(value: number, subject: number): number {
  return (value * subject) % DIVIDER;
}

export function loopTransformSubject(value: number, subject: number, loopSize: number): number {
  let currentValue = value;
  for (let i = 0; i < loopSize; i++) {
    currentValue = transformSubject(currentValue, subject);
  }

  return currentValue;
}

export function findLoopSize(publicKey: number, subject: number): number {
  let loopSize = 0;
  let found = false;

  let value = 1;

  while (!found) {
    loopSize++;
    value = transformSubject(value, subject);

    if (value === publicKey) {
      found = true;
    }
  }

  return loopSize;
}

export function findEncryptionKey(doorPublicKey: number, cardPublicKey: number, subject: number): number {
  const cardLoopSize = findLoopSize(cardPublicKey, subject);

  const encryptionKey = loopTransformSubject(1, doorPublicKey, cardLoopSize);

  return encryptionKey;
}

export function findEncryptionKeyFromWifi(input: string[]): number {
  const [doorPublicKey, cardPublicKey] = input.map(line => parseInt(line));

  const encryptionKey = findEncryptionKey(doorPublicKey, cardPublicKey, 7)

  return encryptionKey;
}