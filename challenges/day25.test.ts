import { findEncryptionKey, findEncryptionKeyFromWifi, findLoopSize, loopTransformSubject } from "./day25";
import { readLines } from '../helpers/file-reader';

describe('day 25 part 1', () => {
    it('get public key if transform 7 by cards loop', () => {
        const publicKey = 5764801;
        const loopSize = 8;
        const result = loopTransformSubject(1, 7, loopSize); //?.
        expect(result).toEqual(publicKey);
    })

    it('find loop size for 5764801', () => {
        const publicKey = 5764801;
        const result = findLoopSize(publicKey, 7); //?.
        expect(result).toEqual(8);
    })

    it('find loop size for 17807724', () => {
        const publicKey = 17807724;
        const result = findLoopSize(publicKey, 7); //?.
        expect(result).toEqual(11);
    })

    it('get encryption key for 17807724 and loopSize of 8', () => {
        const publicKey = 17807724;
        const loopSize = 8;
        const result = loopTransformSubject(1, publicKey, loopSize); //?.
        expect(result).toEqual(14897079);
    })

    it('get encryption key for 5764801 and loopSize of 11', () => {
        const publicKey = 17807724;
        const loopSize = 8;
        const result = loopTransformSubject(1, publicKey, loopSize); //?.
        expect(result).toEqual(14897079);
    })

    it('find encryption key for 17807724', () => {
        const doorPublicKey = 17807724;
        const cardPublicKey = 5764801;
        const result = findEncryptionKey(doorPublicKey, cardPublicKey, 7); //?.
        expect(result).toEqual(14897079);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day25-sample.txt');
        const result = findEncryptionKeyFromWifi(daySample); //?.
        expect(result).toEqual(14897079);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day25-input.txt');
        const result = findEncryptionKeyFromWifi(dayInput); //?.
        expect(result).toEqual(711945);
    })
});

