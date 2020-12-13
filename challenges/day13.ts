import { ppcm } from "../helpers/math";

interface Bus {
  id: number,
  delayedDeparture: number
}

export function isBusArrivalTime (bus: Bus, timestamp: number) {
  return (timestamp + bus.delayedDeparture) % bus.id == 0;
}

export function getBusesSynchronisationCycle (bus1: Bus, bus2: Bus) {
  return ppcm(bus1.id, bus2.id);
}

export function getFirstSyncedDepartureTimestamp(bus1: Bus, bus2: Bus) {
  const step = bus1.id;

  let timestamp = bus1.delayedDeparture + bus1.id;

  do {
    timestamp += step;
  } while (!isBusArrivalTime(bus2, timestamp));

  return timestamp;
}

export function combineBuses (bus1: Bus, bus2: Bus): Bus {
  const busesFirstMatchAt = getFirstSyncedDepartureTimestamp(bus1, bus2);
  const thenBusesMatchEvery = getBusesSynchronisationCycle(bus1, bus2);

  const combinedBus = {
    id: thenBusesMatchEvery,
    delayedDeparture: busesFirstMatchAt
  };

  return combinedBus;
}

export function getNextBus(input: string[]): number {
  const [earliestTimestampStr, busesInService] = input;
  const earliestTimestamp = parseInt(earliestTimestampStr);

  const busIds = busesInService
    .split(',')
    .filter(busId => busId !== 'x')
    .map(busId => parseInt(busId));

  const nextDepartures = busIds
    .map(busId => {
      return {
        id: busId,
        waitTime: busId - (earliestTimestamp % busId)
      }
    })
    .sort((a, b) => a.waitTime - b.waitTime);

  const firstBus = nextDepartures[0];

  return firstBus.id * firstBus.waitTime;
}

export function getNextSyncDepartureTimestamp(input: string[]): number {
  const [_, busesInService] = input;

  const buses = busesInService
    .split(',')
    .map((busId, index): Bus => {
      return {
        id: busId === 'x' ? -1 : parseInt(busId),
        delayedDeparture: index
      }
    })
    .filter(bus => bus.id !== -1);

  let currentBus = buses[0];
  for (let i = 1; i < buses.length; i++)
  {
    const nextBus = buses[i];
    currentBus = combineBuses(currentBus, nextBus);
  }

  return currentBus.delayedDeparture;
}
