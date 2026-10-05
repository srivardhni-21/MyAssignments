export class Browser {

browserVersion() {
console.log("Browser version");
}
}
class Chrome extends Browser {

    browserVersion() {

        console.log("Chrome browser version is 140");

    }

}

let ch = new Chrome();

ch.browserVersion();