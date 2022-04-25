function sum(numA, numB) {
    return numA + numB;
}
function simpleDate() {
    var numA = (new Date().getMonth() + 1);
    var numB = (new Date().getDate());
    var numC = parseInt(Date().split(' ')[3].slice(-2));
    console.log(numA + "/" + numB + "/" + numC);
}
function TimeSplit(x) {
    console.log(Date().split(' ')[4].split(':')[3 - x]);
}
console.log(sum(1, 7));
TimeSplit(2);
