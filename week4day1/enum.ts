// enum - named constants

enum Environment {

LOCAL,
DEVELOPMENT,
STAGING,
PRODUCTION

}

// function to run tests in different environments

function runTests(environment: Environment): void {

console.log("Running tests in " + Environment[environment] + " environment");

}

// example calls

runTests(Environment.LOCAL);
runTests(Environment.DEVELOPMENT);
runTests(Environment.STAGING);
runTests(Environment.PRODUCTION);