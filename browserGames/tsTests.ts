let TESTVAL = "2a";
function Testrun(): void {
    console.log(TESTVAL.repeat(2));
    console.log('Test2'.repeat(3));
    TESTVAL = '1';
}
Testrun();
console.log(TESTVAL);
