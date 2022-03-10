let human = {
    name: 'Doug',
    favColor: 'blue'
};

let nums = [4,3];
let hypotenuse = ((nums[0]**2)+(nums[1]**2))**0.5;
let perimeter = nums[0]+nums[1]+hypotenuse;
let area = nums[0]*nums[1]*0.5;

alert(human.name+' really likes the color '+human.favColor+'!');
console.log(human);

console.log(`The nums array: ${nums}`);
console.log(`${nums[0]} + ${nums[1]} = ${nums[0]+nums[1]}`);
console.log(`A right triangle with width ${nums[0]} and height ${nums[1]} has a hypotenuse of ${hypotenuse}, a perimeter of ${perimeter}, and an area of ${area}.`);

console.log('Hello World!');

human.name = 'Luigi'; // dot notation
human['favColor'] = 'green'; // bracket notation
console.log(human);
console.log(`${human.name} really likes the color ${human.favColor}!`);
