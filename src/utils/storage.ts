import { Cart } from "@models/cart";

export const persistCart:(cart:Cart)=>void = (cart:Cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart));
}

export const getPersistantCart:()=>Cart|null = ()=>{
    return JSON.parse(localStorage.getItem("cart")??"{}");
}