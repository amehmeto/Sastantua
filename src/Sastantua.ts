export class Sastantua {
    private NEW_LINE: string = '\n'
    private LEFT_SLOPE: string = '/'
    private RIGHT_SLOPE: string = '\\'
    private BRICK: string = '*'
    private SPACE: string = ' '
    private DOOR: string = '|'
    private firstTopHeight: number = 3
    private bottomStageLines: number = 1

    draw(size: number): string {
        if (size === 1)
            return this.generateFirstFloor(this.firstTopHeight, size)
        return this.generateTopFloors(1) +
            this.generateFirstFloor(this.firstTopHeight + 1, size)
    }

    private generateFirstFloor(height: number, size: number) {
        return this.generateRegularLines(
                size,
                height - this.bottomStageLines,
                ''
            ) + this.generateDoorLines()
    }

    private generateTopFloors(size: number) {
        return this.generateRegularLines(size, this.firstTopHeight, '')
    }

    private generateRegularLines(size: number, lastLine: number, accumulator: string): string {
        let neededElement: Elements = {
            bricks: 0, spaces: 0, door: 0
        }
        if (size === 1){
            neededElement.bricks = lastLine - 1
            neededElement.spaces = this.firstTopHeight - lastLine
            neededElement.door = 0
        } else {
            neededElement.bricks = lastLine + size + 2
            neededElement.spaces = this.firstTopHeight - lastLine + 1
            neededElement.door = 0
        }
        if (lastLine === 0)
            return accumulator
        return this.generateRegularLines(
            size,
            lastLine - 1,
            this.generateLine(LineType.REGULAR, neededElement
            ) + accumulator
        )
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