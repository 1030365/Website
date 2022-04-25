function Sum(numA, numB) {
    console.log(numA+numB);
}

function simpleDate() {
    let numA: number = (new Date().getMonth()+1);
    let numB = (new Date().getDate());
    let numC = parseInt(Date().split(' ')[3].slice(-2));
    console.log(numA+"/"+numB+"/"+numC);
}

function TimeSplit(x: number) {
    console.log(Date().split(' ')[4].split(':')[3-x]);
}

Sum(1,7);

TimeSplit(2);
