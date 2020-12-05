export class Seat {
  seatCode: string;
  
  public row: number;
  public column: number;
  public id: number;

  constructor(seatCode: string) {
    this.seatCode = seatCode;
    this.row = 0;
    this.column = 0;
    this.id = 0;
    this.extractSeatData(seatCode);
  }
  
  extractSeatData(seatCode: string) {
    this.row = this.getSeatRow(seatCode);
    this.column = this.getSeatColumn(seatCode);
    this.id = this.row * 8 + this.column;
  }

  getSeatRow(seatCode: string): number {
    const numberOfRows = 127;
    const rowsInstructions = seatCode.substring(0, 7);
    return this.getPosition(rowsInstructions, 'B', numberOfRows);
  }

  getSeatColumn(seatCode: string): number {
    const numberOfColumns = 7;
    const columnsInstructions = seatCode.substring(7);
    return this.getPosition(columnsInstructions, 'R', numberOfColumns);
  }

  getPosition(seatInstructions: string, upperCode: string, maxRange: number): number {
    let range: [number, number] = [0, maxRange];

    for (const char of seatInstructions) {
      if (char == upperCode) {
        range = this.getUpperHalf(range);
      } else {
        range = this.getLowerHalf(range);
      }
    }

    return range[0];
  }

  getUpperHalf(range: [number, number]): [number, number] {
    const [min, max] = range;

    const middle = min + Math.ceil((max - min) / 2);

    return [middle, max];
  }

  getLowerHalf(range: [number, number]): [number, number] {
    const [min, max] = range;
    
    const middle = min + Math.floor((max - min) / 2);

    return [min, middle];
  }
}
