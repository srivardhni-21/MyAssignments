// enum - named constants
var Environment;
(function (Environment) {
    Environment[Environment["LOCAL"] = 0] = "LOCAL";
    Environment[Environment["DEVELOPMENT"] = 1] = "DEVELOPMENT";
    Environment[Environment["STAGING"] = 2] = "STAGING";
    Environment[Environment["PRODUCTION"] = 3] = "PRODUCTION";
})(Environment || (Environment = {}));
// function to run tests in different environments
function runTests(environment) {
    console.log("Running tests in " + Environment[environment] + " environment");
}
// example calls
runTests(Environment.LOCAL);
runTests(Environment.DEVELOPMENT);
runTests(Environment.STAGING);
runTests(Environment.PRODUCTION);
