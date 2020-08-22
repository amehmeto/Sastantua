import { Sastantua } from './Sastantua'

const number = +(process.argv[2])
console.log(number)
console.log(new Sastantua().draw(
	number
))