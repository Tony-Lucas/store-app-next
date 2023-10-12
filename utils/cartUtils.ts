import { NextRouter, useRouter } from "next/router"
import { productCartI } from "../interfaces/interfaces"

export const getQuantityCartProduct = (productId: number): number => {
    const cartJson: string | null = window.localStorage.getItem("cart")
    if (cartJson) {
        let cart: productCartI[] = JSON.parse(cartJson)
        let product: productCartI = cart.filter((productCart) => productCart.id === productId)[0]
        if (product) {
            return product.quantity
        } else {
            return 0
        }
    } else {
        return 0
    }
}

export const addToCart = (setQuantity: React.Dispatch<React.SetStateAction<number>>, product: productCartI, router: NextRouter) => {
    const quantityCart: number = getQuantityCartProduct(product.id)
    const cartJson: string | null = window.localStorage.getItem("cart")
    if (cartJson) {
        let cart: productCartI[] = JSON.parse(cartJson)
        const isStored: productCartI = cart.filter((product: productCartI) => product.id === product.id)[0]
        if (isStored) {
            const indexStored: number = cart.findIndex((product: productCartI) => product.id === product.id)
            cart = [
                ...cart.slice(0, indexStored),
                { ...cart[indexStored], quantity: quantityCart + 1 },
                ...cart.slice(indexStored + 1)
            ]
            setQuantity(quantityCart + 1)
            window.localStorage.setItem("cart", JSON.stringify(cart))
        } else {
            window.localStorage.setItem("cart", JSON.stringify([...cart, { ...product, quantity: 1 }]))
            setQuantity(1)
        }
    } else {
        window.localStorage.setItem("cart", JSON.stringify([{ ...product, quantity: 1 }]))
    }
}


export const removeToCart = (setQuantity: React.Dispatch<React.SetStateAction<number>>, product: productCartI, router: NextRouter) => {
    const quantityCart: number = getQuantityCartProduct(product.id)
    const cartJson: string | null = window.localStorage.getItem("cart")
    if (cartJson) {
        let cart: productCartI[] = JSON.parse(cartJson)
        const indexStored: number = cart.findIndex((product: productCartI) => product.id === product.id)
        if (cart[indexStored].quantity !== 1) {
            cart = [
                ...cart.slice(0, indexStored),
                { ...cart[indexStored], quantity: quantityCart - 1 },
                ...cart.slice(indexStored + 1)
            ]
            setQuantity(quantityCart - 1)
            window.localStorage.setItem("cart", JSON.stringify(cart))
        } else {
            const newCart: productCartI[] = cart.filter((product: productCartI) => product.id !== product.id)
            setQuantity(0)
            window.localStorage.setItem("cart", JSON.stringify(newCart))
        }
    }
}
