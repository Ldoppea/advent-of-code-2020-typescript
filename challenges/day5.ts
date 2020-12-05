import { Seat } from './day5-seat';

export function getHighestSeatId(input: string[]): number {
  const seats = input.map(line => new Seat(line));

  const ids = seats.map(seat => seat.id);

  return Math.max(...ids);
}

export function GetMySeat(input: string[]): number {
  const seats = input.map(line => new Seat(line));

  const ids = seats.map(seat => seat.id).sort((a, b) => a - b);

  let seatId = Math.min(...ids);

  for(let id of ids) {
    if (id > seatId) {
      break;
    }
    seatId += 1;
  }

  return seatId;
}
