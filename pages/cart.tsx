import Styled from "styled-components";
import DefaultLayout from "../layout/defaultLayout";
import Colors from "../public/colors.json"
import { EmptyCart } from "../public/icons/Icons";
import Image from "next/image";
import { TerciaryMediumButton } from "../components/Button/Buttons";
import { Router, useRouter } from "next/router";
import { useState } from "react"
import { CardSkeleton } from "../components/ProductCard/ProductCard";
import CartProductCard, { CartCardSkeleton } from "../components/CartProductCard/CartProductCard";
import { useEffect } from "react"
import { productCartI } from "../interfaces/interfaces";
import axios from "../axios/axiosInstance"

export default function Cart() {

    const [loading, setLoading] = useState<boolean>(false)
    const [cart, setCart] = useState<productCartI[]>([])

    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        const productsCart = window.localStorage.getItem("cart")
        if (productsCart) {
            setCart(JSON.parse(productsCart))
            setLoading(false)
        }
        setLoading(false)
    }, [])

    const deleteProduct = (productId: number) => {
        const jsonCart: any = window.localStorage.getItem("cart")
        if (jsonCart) {
            const cartP: productCartI[] = JSON.parse(jsonCart)
            const newCart: productCartI[] = cartP.filter((productCart: productCartI) => productCart.id !== productId)
            window.localStorage.setItem("cart", JSON.stringify(newCart))
            setCart(newCart)
        }
    }

    return (
        <DefaultLayout>
            <Main>
                <Title>Carrinho</Title>
                {
                    !loading && cart.length ?
                        cart.map((product: productCartI) => {
                            return (
                                <CartProductCard product={product} deleteProduct={deleteProduct} />
                            )
                        })
                        :
                        <EmptyContainer>
                            <Image src="/img/emptycart.png" width={0} height={0} sizes="100%" style={{ width: "100%", height: "200px", borderRadius: "5px" }} alt="" />
                            <TextContainer>
                                <EmptyTitle>Carrinho vazio</EmptyTitle>
                                <TerciaryMediumButton onClick={() => router.push("/")}>Ir para o catálogo</TerciaryMediumButton>
                            </TextContainer>
                        </EmptyContainer>
                }

                {loading && (
                    <ContainerCartProducts>
                        <CartCardSkeleton />
                        <CartCardSkeleton />
                        <CartCardSkeleton />
                        <CartCardSkeleton />
                        <CartCardSkeleton />
                        <CartCardSkeleton />
                    </ContainerCartProducts>
                )}
            </Main>
        </DefaultLayout>
    )
}

const Main = Styled.div`
    display:flex;
    height: 100%;
    box-sizing: border-box;
    flex-direction: column;
    row-gap: 20px;
    margin-right: 24px;
`

const EmptyContainer = Styled.div`
    display:flex;
    align-items:center;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    grid-template-columns: fit-content(100%);
    row-gap: 24px;
    padding-top: 12vh;
    svg{
        
        width: 80%;
    }
`

const TextContainer = Styled.div`
    display:grid;
    row-gap: 0px;
`

const Title = Styled.span`
    font-family: Extrabold;
    font-size: 24px;
    color: ${Colors.DARK_500};
`

const EmptyTitle = Styled.span`
    font-family: Bold;
    font-size: 20px;
    color: ${Colors.DARK_500};
    text-align:center;
`

const ContainerCartProducts = Styled.div`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 24px;
    row-gap: 16px;
    height: fit-content;
`

