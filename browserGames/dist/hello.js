function sum(numA, numB) {
  return numA + numB;
}

function simpleDate() {
  let numA = new Date().getMonth() + 1;
  let numB = new Date().getDate();
  let numC = parseInt(Date().split(' ')[3].slice(-2));
  console.log(numA + "/" + numB + "/" + numC);
}

function timeSplit(x) {
  console.log(Date().split(' ')[4].split(':')[3 - x]);
}

console.log(sum(1, 7));
timeSplit(2);