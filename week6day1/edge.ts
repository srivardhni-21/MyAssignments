import { Browser } from "./browser";

export class Edge extends Browser {

launchBrowser() {
console.log("Edge browser is launched");
}
}

let obj = new Edge();

obj.browserType();
obj.browserVersion();
obj.launchBrowser();
