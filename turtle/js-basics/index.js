let human = {
    name: 'Doug',
    favColor: 'blue'
};

let numA = 7;
let numB = 5;

alert(human.name+' really likes the color '+human.favColor+'!');
console.log(human);

console.log(`The numA variable is ${numA}, and the numB variable is ${numB}`);
console.log(`${numA} + ${numB} = ${numA+numB}`);

console.log('Hello World!');

human.name = 'Luigi';
human.favColor = 'green';
console.log(human);
console.log(`${human.name} really likes the color ${human.favColor}!`);
