
import Styled from "styled-components"
import Colors from "../../public/colors.json"
import { productCartI, productI } from "../../interfaces/interfaces"
import { useEffect, useState } from "react"
import { GetServerSidePropsContext, GetStaticProps } from "next"
import axios from "../../axios/axiosInstance"
import Image from "next/image"
import { AddIcon, ArrowLeftIcon, FavouriteIcon, MinusIcon } from "../../public/icons/Icons"
import { IconButton, MediumIconButton, PrimaryMediumButton, TerciaryIconButtonSm } from "../../components/Button/Buttons"
import { useRouter } from "next/router"
import { filterByCartProduct } from "../../utils/localStorageUtil"
import { getCookie } from 'cookies-next';

export const getServerSideProps = async (context: any) => {
    if (context.params.id) {
        try {
            const result: any = (await axios.get(`/product/${context.params.id}`)).data
            return { props: { product: result.product } };
        } catch (error) {

        }

    }
}

export default function Index(props: any) {

    const [productD, setProductD] = useState<productI>()
    const [quantityCart, setQuantityCart] = useState<number>(0)
    const [cartJson, setCartJson] = useState<any>()
    const [logged, setLogged] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {

        const verifyAuth = async () => {
            const resultAuth: any = (await axios.get("/auth")).data
            setLogged(resultAuth.success)
        }

        verifyAuth()

        if (window.localStorage) {
            setQuantityCart(filterByCartProduct(props.product.id))
        }
    }, [])

    const addToCart = () => {
        if (logged) {
            const cartJson: string | null = window.localStorage.getItem("cart")
            if (cartJson) {
                let cart: productCartI[] = JSON.parse(cartJson)
                const isStored: productCartI = cart.filter((product: productCartI) => product.id === props.product.id)[0]
                if (isStored) {
                    const indexStored: number = cart.findIndex((product: productCartI) => product.id === props.product.id)
                    cart = [
                        ...cart.slice(0, indexStored),
                        { ...cart[indexStored], quantity: quantityCart + 1 },
                        ...cart.slice(indexStored + 1)
                    ]
                    setQuantityCart(quantityCart + 1)
                    window.localStorage.setItem("cart", JSON.stringify(cart))
                } else {
                    window.localStorage.setItem("cart", JSON.stringify([...cart, { ...props.product, quantity: 1 }]))
                    setQuantityCart(1)
                }
            } else {
                window.localStorage.setItem("cart", JSON.stringify([{ ...props.product, quantity: 1 }]))
            }
        } else {
            router.push("/login")
        }
    }

    const removeToCart = () => {
        if (logged) {
            const cartJson: string | null = window.localStorage.getItem("cart")
            if (cartJson) {
                let cart: productCartI[] = JSON.parse(cartJson)
                const indexStored: number = cart.findIndex((product: productCartI) => product.id === props.product.id)
                if (cart[indexStored].quantity !== 1) {
                    cart = [
                        ...cart.slice(0, indexStored),
                        { ...cart[indexStored], quantity: quantityCart - 1 },
                        ...cart.slice(indexStored + 1)
                    ]
                    setQuantityCart(quantityCart - 1)
                    window.localStorage.setItem("cart", JSON.stringify(cart))
                } else {
                    const newCart: productCartI[] = cart.filter((product: productCartI) => product.id !== props.product.id)
                    setQuantityCart(0)
                    window.localStorage.setItem("cart", JSON.stringify(newCart))
                }
            }
        } else {
            router.push("/login")
        }
    }

    const conditionalRenderBottom = () => {
        if (!logged) {
            return (
                <PrimaryMediumButton onClick={() => addToCart()}>Colocar no carrinho</PrimaryMediumButton>
            )
        } else if (logged && quantityCart > 0) {
            return (
                <OptionsContainer>
                    <MediumIconButton onClick={() => removeToCart()}><MinusIcon /></MediumIconButton>
                    <Quantity>{quantityCart}</Quantity>
                    <MediumIconButton onClick={() => addToCart()}><AddIcon /></MediumIconButton>
                </OptionsContainer>
            )
        } else if (logged && quantityCart === 0) {
            return (
                <PrimaryMediumButton onClick={() => addToCart()}>Colocar no carrinho</PrimaryMediumButton>
            )
        }
    }

    return (
        <Container className="d-flex flex-column">
            <Header className="d-flex justify-content-between align-items-center">
                <BackButton onClick={() => router.push("/")}><ArrowLeftIcon /></BackButton>
                <Title>Detalhes do produto</Title>
                <TerciaryIconButtonSm onClick={() => null}><FavouriteIcon /></TerciaryIconButtonSm>
            </Header>
            <Image alt={"imagem " + props.product.name} src={props.product.imgUrl || "/img/defaultImg.jpg"} width={0} height={0} sizes="100%" style={{ width: "100%", height: "150px", borderRadius: "5px" }} />
            <BodyContainer>
                <Name>{props.product.name}</Name>
                <Description>{props.product.description || "Produto sem descrição"}</Description>
            </BodyContainer>
            <SectionLabel>Cores</SectionLabel>
            <BottomFloating className=" bg-white justify-content-between">
                <PriceContainer>
                    <PriceLabel>Preço</PriceLabel>
                    <Price>R$ {props.product.priceRetail}</Price>
                </PriceContainer>
                {conditionalRenderBottom()}
            </BottomFloating>
        </Container>
    )
}

const Container = Styled.div`
    padding: 24px;
    row-gap: 24px;
    
`
const Header = Styled.div`
    
`

const BottomFloating = Styled.div`
    display:grid;
    grid-template-columns: 1fr fit-content(100%);
    height: 68px;
    align-items:center;
    position: fixed;
    bottom:0;
    left: 0;
    width: 100vw;
    background-color: black;
    padding: 0px 24px;
    border-top: 1px solid ${Colors.GRAY_300};
`

const BackButton = Styled.button`
    display:grid;
    justify-content:center;
    align-items:center;
    height: 32px;
    width: 32px;
    background-color: transparent;
    border: 1px solid ${Colors.GRAY_700};
    border-radius: 5px;

    svg {
        width: 24px;
        height: 24px;
    }
`

const Title = Styled.span`
    font-size: 16px;
    color: ${Colors.DARK_500};
    font-family: Regular;
`

const BodyContainer = Styled.div`

`

const Name = Styled.span`
    font-family: Semibold;
    color: ${Colors.DARK_500};
    font-size: 24px;
`

const Description = Styled.span`
    font-family: Regular;
    color: ${Colors.GRAY_900};
    font-size: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`

const PriceContainer = Styled.div`
    display:grid;
    row-gap: 0px;
`

const Price = Styled.span`
    font-size: 18px;
    font-family: Bold;
    color: ${Colors.DARK_500};
`

const PriceLabel = Styled.span`
    font-size: 12px;
    font-family: Semibold;
    color: ${Colors.GRAY_900};
`

const SectionLabel = Styled.span`
    font-size: 20px;
    font-family: Bold;
    color: ${Colors.DARK_500};
`

const OptionsContainer = Styled.div`
    display:grid;
    grid-template-columns: fit-content(100%) fit-content(100%) fit-content(100%);
    column-gap: 8px;
    align-items:center;
`

const Quantity = Styled.span`
    display:grid;
    justify-content:center;
    align-items:center;
    border-radius: 5px;
    height: 40px;
    font-family: Medium;
    color: ${Colors.DARK_500};
    background-color: ${Colors.GRAY_300};
    width: 40px;
`