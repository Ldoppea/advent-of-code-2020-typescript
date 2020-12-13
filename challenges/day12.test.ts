import { getShipManhattanDistance, getNewShipPosition, getNewShipPositionWithWaypoint, getShipManhattanDistanceWithWaypoint } from "./day12";
import { NORTH_CODE, EAST_CODE, WEST_CODE, SOUTH_CODE, FORWARD_CODE, RIGHT_CODE, LEFT_CODE } from "./day12" 
import { readLines } from '../helpers/file-reader';

describe('day 12 part 1', () => {
    it('should go forward east', () => {
        const shipPosition = {
            horizontal: 0,
            vertical: 0,
            direction: EAST_CODE
        };

        const instruction = 'F10';
        const result = getNewShipPosition(shipPosition, instruction);
        expect(result).toEqual({
            horizontal: 10,
            vertical: 0,
            direction: EAST_CODE
        });
    })

    it('should go forward north', () => {
        const shipPosition = {
            horizontal: 0,
            vertical: 0,
            direction: NORTH_CODE
        };

        const instruction = 'F10';
        const result = getNewShipPosition(shipPosition, instruction);
        expect(result).toEqual({
            horizontal: 0,
            vertical: 10,
            direction: NORTH_CODE
        });
    })

    it('should go east', () => {
        const shipPosition = {
            horizontal: 0,
            vertical: 0,
            direction: NORTH_CODE
        };

        const instruction = 'E10';
        const result = getNewShipPosition(shipPosition, instruction);
        expect(result).toEqual({
            horizontal: 10,
            vertical: 0,
            direction: NORTH_CODE
        });
    })

    it('should go west', () => {
        const shipPosition = {
            horizontal: 0,
            vertical: 0,
            direction: NORTH_CODE
        };

        const instruction = 'W10';
        const result = getNewShipPosition(shipPosition, instruction);
        expect(result).toEqual({
            horizontal: -10,
            vertical: 0,
            direction: NORTH_CODE
        });
    })

    it('should turn right 90', () => {
        const shipPosition = {
            horizontal: 0,
            vertical: 0,
            direction: NORTH_CODE
        };

        const instruction = 'R90';
        const result = getNewShipPosition(shipPosition, instruction);
        expect(result).toEqual({
            horizontal: 0,
            vertical: 0,
            direction: EAST_CODE
        });
    })

    it('should turn right 180', () => {
        const shipPosition = {
            horizontal: 0,
            vertical: 0,
            direction: NORTH_CODE
        };

        const instruction = 'R180';
        const result = getNewShipPosition(shipPosition, instruction);
        expect(result).toEqual({
            horizontal: 0,
            vertical: 0,
            direction: SOUTH_CODE
        });
    })

    it('should turn left 90', () => {
        const shipPosition = {
            horizontal: 0,
            vertical: 0,
            direction: NORTH_CODE
        };

        const instruction = 'L90';
        const result = getNewShipPosition(shipPosition, instruction);
        expect(result).toEqual({
            horizontal: 0,
            vertical: 0,
            direction: WEST_CODE
        });
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day12-sample.txt');
        const result = getShipManhattanDistance(daySample); //?.
        expect(result).toEqual(25);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day12-input.txt');
        const result = getShipManhattanDistance(dayInput); //?.
        expect(result).toEqual(904);
    })
});

describe('day 12 part 2', () => {
    it('should move ship forward waypoint 10 times', () => {
        const shipPositionWithWaypoint = {
            ship: {
                horizontal: 0,
                vertical: 0
            },
            waypoint: {
                horizontal: 10,
                vertical: 1
            }
        };

        const instruction = 'F10';
        const result = getNewShipPositionWithWaypoint(shipPositionWithWaypoint, instruction);
        expect(result).toEqual({
            ship: {
                horizontal: 100,
                vertical: 10
            },
            waypoint: {
                horizontal: 10,
                vertical: 1
            }
        });
    })
    
    it('should move waypoint north 3', () => {
        const shipPositionWithWaypoint = {
            ship: {
                horizontal: 100,
                vertical: 10
            },
            waypoint: {
                horizontal: 10,
                vertical: 1
            }
        };

        const instruction = 'N3';
        const result = getNewShipPositionWithWaypoint(shipPositionWithWaypoint, instruction);
        expect(result).toEqual({
            ship: {
                horizontal: 100,
                vertical: 10
            },
            waypoint: {
                horizontal: 10,
                vertical: 4
            }
        });
    })
    
    it('should move ship forward waypoint 7 times', () => {
        const shipPositionWithWaypoint = {
            ship: {
                horizontal: 100,
                vertical: 10
            },
            waypoint: {
                horizontal: 10,
                vertical: 4
            }
        };

        const instruction = 'F7';
        const result = getNewShipPositionWithWaypoint(shipPositionWithWaypoint, instruction);
        expect(result).toEqual({
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: 10,
                vertical: 4
            }
        });
    })

    it('should rotate waypoint arround ship 90', () => {
        const shipPositionWithWaypoint = {
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: 10,
                vertical: 4
            }
        };

        const instruction = 'R90';
        const result = getNewShipPositionWithWaypoint(shipPositionWithWaypoint, instruction);
        expect(result).toEqual({
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: 4,
                vertical: -10
            }
        });
    })

    it('should rotate waypoint arround ship 180', () => {
        const shipPositionWithWaypoint = {
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: 10,
                vertical: 4
            }
        };

        const instruction = 'R180';
        const result = getNewShipPositionWithWaypoint(shipPositionWithWaypoint, instruction);
        expect(result).toEqual({
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: -10,
                vertical: -4
            }
        });
    })

    it('should rotate waypoint arround ship -90', () => {
        const shipPositionWithWaypoint = {
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: 10,
                vertical: 4
            }
        };

        const instruction = 'L90';
        const result = getNewShipPositionWithWaypoint(shipPositionWithWaypoint, instruction);
        expect(result).toEqual({
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: -4,
                vertical: 10
            }
        });
    })
    
    it('should rotate waypoint arround ship -180', () => {
        const shipPositionWithWaypoint = {
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: 10,
                vertical: 4
            }
        };

        const instruction = 'R180';
        const result = getNewShipPositionWithWaypoint(shipPositionWithWaypoint, instruction);
        expect(result).toEqual({
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: -10,
                vertical: -4
            }
        });
    })

    it('should move ship forward waypoint 11 times', () => {
        const shipPositionWithWaypoint = {
            ship: {
                horizontal: 170,
                vertical: 38
            },
            waypoint: {
                horizontal: 4,
                vertical: -10
            }
        };

        const instruction = 'F11';
        const result = getNewShipPositionWithWaypoint(shipPositionWithWaypoint, instruction);
        expect(result).toEqual({
            ship: {
                horizontal: 214,
                vertical: -72
            },
            waypoint: {
                horizontal: 4,
                vertical: -10
            }
        });
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day12-sample.txt');
        const result = getShipManhattanDistanceWithWaypoint(daySample); //?.
        expect(result).toEqual(286);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day12-input.txt');
        const result = getShipManhattanDistanceWithWaypoint(dayInput); //?.
        expect(result).toEqual(18747);
    })
});

