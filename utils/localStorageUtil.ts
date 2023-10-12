import { productCartI } from "../interfaces/interfaces"

export function filterByCartProduct(id: number): number {
    if (typeof window !== "undefined") {
        const cartJson = window.localStorage.getItem("cart")
        if (cartJson) {
            const cart: productCartI[] = JSON.parse(cartJson)
            const isStored: productCartI = cart.filter((product: any) => product.id === id)[0]
            if(isStored){
                return isStored.quantity
            }else{
                return 0
            }
        } else {
            return 0
        }
    }else{
        return 0
    }
}