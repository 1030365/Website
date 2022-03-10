function triangleFinder(sides) {
    let c = ((sides[0]**2)+(sides[1]**2))**0.5;
    let p = sides[0]+sides[1]+c;
    let a = sides[0]*sides[1]*0.5;
    return [c,p,a];
}
function floor(num) {
    if (Math.round(num) <= num) {
        return Math.round(num);
    }
    return Math.round(num)-1;
}

let human = {
    name: 'Doug',
    favColor: 'blue'
};

let nums = [4,3];
let hypotenuse = triangleFinder(nums)[0];
let perimeter = triangleFinder(nums)[1];
let area = triangleFinder(nums)[2];

alert(human.name+' really likes the color '+human.favColor+'!');
console.log(human);

console.log(`The nums array: ${nums}`);
console.log(`${nums[0]} + ${nums[1]} = ${nums[0]+nums[1]}`);
console.log(`A right triangle with width ${nums[0]} and height ${nums[1]} has a hypotenuse of ${hypotenuse}, a perimeter of ${perimeter}, and an area of ${area}.`);

nums = [15,8];
hypotenuse = triangleFinder(nums)[0];
perimeter = triangleFinder(nums)[1];
area = triangleFinder(nums)[2];
console.log(`The nums array: ${nums}`);
console.log(`${nums[0]} + ${nums[1]} = ${nums[0]+nums[1]}`);
console.log(`A right triangle with width ${nums[0]} and height ${nums[1]} has a hypotenuse of ${hypotenuse}, a perimeter of ${perimeter}, and an area of ${area}.`);

console.log('Hello World!');

human.name = 'Luigi'; // dot notation
human['favColor'] = 'green'; // bracket notation
console.log(human);
console.log(`${human.name} really likes the color ${human.favColor}!`);

let testnum = 8.7;
console.log(`testnum = ${testnum}`);
console.log(floor(testnum));
