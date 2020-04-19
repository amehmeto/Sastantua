export class Sastantua {
    private NEW_LINE: string = '\n'
    private LEFT_SLOPE: string = '/'
    private RIGHT_SLOPE: string = '\\'
    private BRICK: string = '*'
    private SPACE: string = ' '
    private DOOR: string = '|'
    private TOP_FLOOR_HEIGHT: number = 3
    private BOTTOM_STAGE_LINES: number = 1
    private EMPTY_STRING = ''

    draw(size: number): string {
        return this.generateFloors(size)
    }

    private generateFloors(totalFloors: number) {
        let lines = this.EMPTY_STRING
        let lineNumber = 1

        for (let floor = 1 ; floor <= totalFloors ; floor++) {
            let _ret = this.generateRegularLines(floor, totalFloors, lineNumber++)
            lineNumber = _ret.lineNumber
            lines += _ret.lines
        }

        return lines
    }

    private generateRegularLines(currentFloor: number, totalFloors: number, lineNumber: number) {
        let lines = this.EMPTY_STRING

        for (let linesToBuild = this.getHeight(currentFloor) ; linesToBuild ; linesToBuild--) {
            let neededElements = this.getNeededElements(lineNumber++, totalFloors, linesToBuild, currentFloor)
            lines += this.generateLine(LineType.REGULAR, neededElements)
        }
        return { lines, lineNumber }
    }

    private getHeight(size: number): number {
        if (size === 1)
            return this.TOP_FLOOR_HEIGHT
        return this.getHeight(size - 1) + 1
    }

    private getNeededElements(line: number, totalFloors: number, height: number, currentFloor: number) {
        return {
            bricks: this.calculateNeededBricksForOneSide(line, currentFloor),
            spaces: this.calculateNeededOffset(height, currentFloor, totalFloors),
            door: 0,
        }
    }

    private calculateNeededBricksForOneSide(line: number, currentFloor: number) {
        const defaultTriangle = line - 1
        return defaultTriangle + this.calculateSuperiorFloorsCumulatedOffset(currentFloor)
    }

    private calculateSuperiorFloorsCumulatedOffset(currentFloor: number): number {
        if (currentFloor === 1)
            return 0
        return this.getCurrentFloorOffset(currentFloor - 1)
            + this.calculateSuperiorFloorsCumulatedOffset(currentFloor - 1)
    }

    private calculateNeededOffset(height: number, currentFloor: number, totalFloors: number): number {
        const triangleOffsetByDefault = this.getTriangleOffsetByDefault(height)
        const offsetForNewFloor = this.calculateSubFloorsOffset(currentFloor, totalFloors)
        const offsetForSubFloorsLines = this.countSubFloorsLinesFromFloor(totalFloors - 1, currentFloor - 1)
        return triangleOffsetByDefault + offsetForSubFloorsLines + offsetForNewFloor
    }

    private getTriangleOffsetByDefault(height: number) {
        return height - 1
    }

    private calculateSubFloorsOffset(currentFloor: number, totalFloors: number): number {
        if (totalFloors - currentFloor === 0)
            return 0
        return this.getCurrentFloorOffset(currentFloor) + this.calculateSubFloorsOffset(currentFloor + 1, totalFloors)
    }

    private getCurrentFloorOffset(currentFloor: number) {
        return Math.ceil(currentFloor / 2) + 1
    }

    private countSubFloorsLinesFromFloor(floor: number, to: number): number {
        if (floor === to)
            return 0
        return this.getFloorHeight(floor) + this.countSubFloorsLinesFromFloor(floor - 1, to)
    }

    private getFloorHeight(stage: number) {
        return this.TOP_FLOOR_HEIGHT + stage
    }

    private generateDoorLines() {
        const neededElements = {
            spaces: 0, bricks: 2, door: 1
        }
        return this.generateLine(LineType.DOOR, neededElements)
    }

    private generateLine(lineType: string, neededElements: Elements) {
        return this.accumulateElements(neededElements.spaces, this.SPACE) +
            this.LEFT_SLOPE +
            this.accumulateElements(neededElements.bricks, this.BRICK) +
            this.generateCentralElement(lineType) +
            this.accumulateElements(neededElements.bricks, this.BRICK) +
            this.RIGHT_SLOPE + this.NEW_LINE
    }

    private generateCentralElement(lineType: string) {
        return (lineType === LineType.REGULAR) ? this.BRICK : this.DOOR
    }

    private accumulateElements(elementsNeeded: number, accumulator: string): string {
        const baseElement = accumulator.charAt(0)
        if (elementsNeeded === 0)
            return ''
        if (elementsNeeded === 1)
            return accumulator
        return this.accumulateElements(
            elementsNeeded - 1, accumulator + baseElement
        )
    }
}

enum LineType {
    REGULAR = 'regular',
    DOOR = 'door'
}

type Elements = {
    bricks: number,
    spaces: number,
    door: number
}