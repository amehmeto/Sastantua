export class Sastantua {
	private NEW_LINE: string = '\n'
	private LEFT_SLOPE: string = '/'
	private RIGHT_SLOPE: string = '\\'
	private BRICK: string = '*'
	private SPACE: string = ' '
	private DOOR: string = '|'
	private TOP_FLOOR_HEIGHT: number = 3
	private EMPTY_STRING = ''

	draw(pyramidSize: number): string {
		const regularFloors = this.generateUpperFloors(pyramidSize)
		return regularFloors.lines + this.generateFirstFloor(pyramidSize, regularFloors.lineNumber)
	}

	private generateUpperFloors(pyramidSize: number) {
		let lines = this.EMPTY_STRING
		let lineNumber = 1
		for (let floor = 1 ; floor <= pyramidSize - 1 ; floor++) {
			let _ret = this.generateRegularLines(floor, pyramidSize, lineNumber--)
			lineNumber = _ret.lineNumber
			lines += _ret.lines
		}
		return { lines, lineNumber }
	}

	private generateRegularLines(currentFloor: number, pyramidSize: number, lineNumber: number) {
		let lines = this.EMPTY_STRING
		for (let linesToBuild = this.getHeightOf(currentFloor) ; linesToBuild ; linesToBuild--) {
			let neededElements =
				this.getNeededElements(lineNumber++, pyramidSize, linesToBuild, currentFloor, LineType.REGULAR)
			lines += this.buildLine(LineType.REGULAR, neededElements)
		}
		return { lines, lineNumber }
	}

	private getHeightOf(floor: number): number {
		if (floor === 1)
			return this.TOP_FLOOR_HEIGHT
		return this.getHeightOf(floor - 1) + 1
	}

	private getNeededElements(
		line: number,
		pyramidSize: number,
		lineHeightInFloor: number,
		currentFloor: number,
		lineType: LineType
	) {
		if (lineType === LineType.DOOR) {
			const doorNeededBySide = Math.floor(pyramidSize / 2)
			return {
				bricks: this.calculateNeededBricksForOneSide(line, currentFloor) - doorNeededBySide,
				spaces: this.calculateNeededOffset(lineHeightInFloor, currentFloor, pyramidSize),
				door: doorNeededBySide,
			}
		}
		return {
			bricks: this.calculateNeededBricksForOneSide(line, currentFloor),
			spaces: this.calculateNeededOffset(lineHeightInFloor, currentFloor, pyramidSize),
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

	private calculateNeededOffset(lineHeightInFloor: number, currentFloor: number, pyramidSize: number): number {
		const triangleOffsetByDefault = this.getDefaultTriangleOffset(lineHeightInFloor)
		const offsetForNewFloor = this.calculateInferiorFloorsOffset(currentFloor, pyramidSize)
		const offsetForInferiorFloorsLines = this.countInferiorFloorsLinesFromFloor(pyramidSize - 1, currentFloor - 1)
		return triangleOffsetByDefault + offsetForInferiorFloorsLines + offsetForNewFloor
	}

	private getDefaultTriangleOffset(lineHeightInFloor: number) {
		return lineHeightInFloor - 1
	}

	private calculateInferiorFloorsOffset(currentFloor: number, pyramidSize: number): number {
		if (pyramidSize - currentFloor === 0)
			return 0
		return this.getCurrentFloorOffset(currentFloor) + this.calculateInferiorFloorsOffset(currentFloor + 1, pyramidSize)
	}

	private getCurrentFloorOffset(currentFloor: number) {
		return Math.ceil(currentFloor / 2) + 1
	}

	private countInferiorFloorsLinesFromFloor(floor: number, to: number): number {
		if (floor === to)
			return 0
		return this.getFloorHeight(floor) + this.countInferiorFloorsLinesFromFloor(floor - 1, to)
	}

	private getFloorHeight(stage: number) {
		return this.TOP_FLOOR_HEIGHT + stage
	}

	private generateFirstFloor(pyramidSize: number, lineNumber: number) {
		let lines = this.EMPTY_STRING
		const currentFloor = pyramidSize
		let lineHeightInFloor = this.getHeightOf(currentFloor)

		let neededElements = this.getNeededElements(lineNumber++, pyramidSize, lineHeightInFloor--, currentFloor, LineType.REGULAR)
		lines += this.buildLine(LineType.REGULAR, neededElements)
		neededElements = this.getNeededElements(lineNumber++, pyramidSize, lineHeightInFloor--, currentFloor, LineType.REGULAR)
		lines += this.buildLine(LineType.REGULAR, neededElements)

		while (lineHeightInFloor) {
			if (pyramidSize >= 5 && lineHeightInFloor === Math.ceil((this.getHeightOf(currentFloor) - 2) / 2) ){
				neededElements = this.getNeededElements(lineNumber++, pyramidSize, lineHeightInFloor--, currentFloor, LineType.DOOR)
				lines += this.generateLockLine(neededElements)
			}
			else {
				neededElements = this.getNeededElements(lineNumber++, pyramidSize, lineHeightInFloor--, currentFloor, LineType.DOOR)
				lines += this.generateDoorLines(neededElements)
			}
		}
		return lines
	}

	private generateDoorLines(neededElements: Elements) {
		return this.buildLine(LineType.DOOR, neededElements)
	}

	private generateLockLine(neededElements: Elements) {
		return this.buildLine(LineType.LOCK, neededElements)
	}

	private buildLine(lineType: string, neededElements: Elements) {
		return this.accumulateElements(neededElements.spaces, this.SPACE) +
			this.LEFT_SLOPE +
			this.accumulateElements(neededElements.bricks, this.BRICK) +
			this.accumulateElements(neededElements.door, this.DOOR) +
			this.generateCentralElement(lineType) +
			this.generateLock(neededElements, lineType) +
			this.accumulateElements(neededElements.bricks, this.BRICK) +
			this.RIGHT_SLOPE + this.NEW_LINE
	}

	private generateLock(neededElements: Elements, lineType: string) {
		const potentialLock = this.accumulateElements(neededElements.door, this.DOOR)
		const LOCK_PATTERN = '$|'
		if (lineType === LineType.LOCK)
			return potentialLock.substr(0, potentialLock.length - 2) + LOCK_PATTERN
		return potentialLock
	}

	private generateCentralElement(lineType: string) {
		return this.isLineTypeDoorOrLock(lineType) ? this.DOOR : this.BRICK
	}

	private isLineTypeDoorOrLock(lineType: string) {
		return lineType === LineType.DOOR || lineType === LineType.LOCK
	}

	private accumulateElements(elementsNeeded: number, accumulator: string): string {
		const baseElement = accumulator.charAt(0)
		if (elementsNeeded === 0)
			return ''
		if (elementsNeeded === 1)
			return accumulator
		return this.accumulateElements(elementsNeeded - 1, accumulator + baseElement)
	}
}

enum LineType {
	REGULAR = 'regular',
	DOOR = 'door',
	LOCK = 'lock',
}

type Elements = {
	bricks: number,
	spaces: number,
	door: number
}