export class Sastantua {
    private NEW_LINE: string = '\n'
    private LEFT_SLOPE: string = '/'
    private RIGHT_SLOPE: string = '\\'
    private BRICK: string = '*'
    private SPACE: string = ' '
    private DOOR: string = '|'
    private FIRST_TOP_HEIGHT: number = 3
    private bottomStageLines: number = 1
    private EMPTY_STRING = ''

    draw(size: number): string {
        return this.generateFloors(this.FIRST_TOP_HEIGHT)
    }

    private generateFloors(size: number) {
        return this.generateRegularLines(size)
    }

    private generateRegularLines(size: number) {
        let lines = this.EMPTY_STRING
        let height = this.FIRST_TOP_HEIGHT
        for (let line = 0 ; height ; height--) {
            let neededElements = {
                bricks: 1 + (line++ - 1),
                spaces: height - 1,
                door: 0
            }

            lines += this.generateLine(LineType.REGULAR, neededElements)
        }
        return lines
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