import { expect, type Locator, type Page } from '@playwright/test';

let message1 : string = "Hello";
message1 = "bye";
console.log(message1);

let age2 : number = 30;
console.log(age2);

let isActive : boolean = true;

let numberArry : number[] = [1,2,3];

let data : any = "this could be anything";
data = 42;

function add(a:number,b:number) : number
{

    return a + b;
       
}
add(2,3);

let user : {name : string, age:number, location: string} = {name: "Bob", age:34, location: "Delhi"};
user.location = "hyderabad";

class CartPage
{


    page :Page;
    cartProductText: Locator;
    cartCheckout: Locator;

    constructor(page : any, productName : Locator)
    {

        this.page=page;
        this.cartProductText=page.locator(`h3:has-text("${productName}")`);
        this.cartCheckout = page.locator("text=Checkout");
       
    }

async cartProductCheckOut(productName : any)
    {

        await expect(this.cartProductText).toBeVisible();
        await this.cartCheckout.click();
    
    }
    
}
// module.exports = {CartPage}