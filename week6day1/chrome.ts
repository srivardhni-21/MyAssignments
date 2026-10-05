import { Browser } from "./browser";

export class Chrome extends Browser {

launchBrowser() {
console.log("Chrome browser is launched");
}
}

let obj = new Chrome();

obj.browserType();
obj.browserVersion();
obj.launchBrowser();