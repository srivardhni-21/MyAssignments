export class TextBox {

fill(text: string): void;
fill(text: string, locator: string): void;

fill(text: string, locator?: string): void {

if (locator) {
console.log("Enter " + text + " in " + locator);
} else {
console.log("Enter " + text);
}
}
}

let tb = new TextBox();

tb.fill("Srivardhni");
tb.fill("Srivardhni", "#username");
