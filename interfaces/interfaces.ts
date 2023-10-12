
export interface productI {
    id: number,
    name: string,
    description: string,
    priceWholesale: number,
    priceRetail: number,
    imgUrl?: string,
    imgName?: string
}

export interface productCartI extends productI{
    quantity: number
    color: string
}