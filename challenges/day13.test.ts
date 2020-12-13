import { combineBuses, getBusesSynchronisationCycle, getFirstSyncedDepartureTimestamp, getNextBus, getNextSyncDepartureTimestamp } from "./day13";
import { readLines } from '../helpers/file-reader';

describe('day 13 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day13-sample.txt');
        const result = getNextBus(daySample); //?.
        expect(result).toEqual(295);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day13-input.txt');
        const result = getNextBus(dayInput); //?.
        expect(result).toEqual(261);
    })
});

describe('day 13 part 2', () => {
    it('compute departure cycle for 7, 13', () => {
        const bus1 = {
            id: 7,
            delayedDeparture: 0
        };

        const bus2 = {
            id: 13,
            delayedDeparture: 1
        }

        const result = getBusesSynchronisationCycle(bus1, bus2); //?.
        expect(result).toEqual(91);
    })
    
    it('combine buses 7, 13', () => {
        const bus1 = {
            id: 7,
            delayedDeparture: 0
        };

        const bus2 = {
            id: 13,
            delayedDeparture: 1
        }

        const result = combineBuses(bus1, bus2); //?.
        expect(result).toEqual({
            id: 91,
            delayedDeparture: 77
        });
    })

    it('compute first sync departure for 7, 13', () => {
        const bus1 = {
            id: 7,
            delayedDeparture: 0
        };

        const bus2 = {
            id: 13,
            delayedDeparture: 1
        }

        const result = getFirstSyncedDepartureTimestamp(bus1, bus2); //?.
        expect(result).toEqual(77);
    })

    it('compute result for 17,x,13,19', () => {
        const input = [
          '',
          '17,x,13,19'  
        ];
        const result = getNextSyncDepartureTimestamp(input); //?.
        expect(result).toEqual(3417);
    })

    it('compute result for 67,7,59,61', () => {
        const input = [
          '',
          '67,7,59,61'  
        ];
        const result = getNextSyncDepartureTimestamp(input); //?.
        expect(result).toEqual(754018);
    })

    it('compute result for 67,x,7,59,61', () => {
        const input = [
          '',
          '67,x,7,59,61'  
        ];
        const result = getNextSyncDepartureTimestamp(input); //?.
        expect(result).toEqual(779210);
    })

    it('compute result for 67,7,x,59,61', () => {
        const input = [
          '',
          '67,7,x,59,61'  
        ];
        const result = getNextSyncDepartureTimestamp(input); //?.
        expect(result).toEqual(1261476);
    })

    it('compute result for 1789,37,47,1889', () => {
        const input = [
          '',
          '1789,37,47,1889'  
        ];
        const result = getNextSyncDepartureTimestamp(input); //?.
        expect(result).toEqual(1202161486);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day13-sample.txt');
        const result = getNextSyncDepartureTimestamp(daySample); //?.
        expect(result).toEqual(1068781);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day13-input.txt');
        const result = getNextSyncDepartureTimestamp(dayInput); //?.
        expect(result).toEqual(807435693182510);
    })
});

