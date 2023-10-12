
import Image from "next/image"
import Colors from "../../public/colors.json"
import Styled from "styled-components"
import { useEffect, useState } from "react"
import { productCartI } from "../../interfaces/interfaces"
import { AddIcon, DeleteIcon, MinusIcon } from "../../public/icons/Icons"
import { addToCart, removeToCart } from "../../utils/cartUtils"
import { NextRouter, useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"

interface CartProductCardI {
    product: productCartI,
    deleteProduct: (productId: number) => void
}

export default function CartProductCard({ product, deleteProduct }: CartProductCardI) {

    const [quantity, setQuantity] = useState<number>(0)

    useEffect(() => {
        setQuantity(product.quantity)
    }, [])

    const router: NextRouter = useRouter()

    return (
        <Container key={product.id}>
            <Image alt={"imagem " + product.name} src={product.imgUrl || "/img/defaultImg.jpg"} width={0} height={0} sizes="100%" style={{ width: "100%", height: "75px", borderRadius: "5px" }} />
            <DataContainer>
                <HeaderData>
                    <TextContainer>
                        <Name>{product.name}</Name>
                    </TextContainer>
                    <DeleteButton onClick={() => deleteProduct(product.id)}><DeleteIcon /></DeleteButton>
                </HeaderData>
                <BottomData>
                    <EditQuantityContainer>
                        <AddButton onClick={() => removeToCart(setQuantity, product,router)}><MinusIcon /></AddButton>
                        <Quantity>{product.quantity}</Quantity>
                        <AddButton onClick={() => addToCart(setQuantity, product,router)}><AddIcon /></AddButton>
                    </EditQuantityContainer>
                    <Price>R$ {product.priceRetail.toString().replaceAll(".", ",")}</Price>
                </BottomData>
            </DataContainer >
        </Container >
    )
}

const Container = Styled.div`
    display:grid;
    grid-template-columns: fit-content(100%) 1fr;
    padding-right: 24px;
    column-gap: 16px;
`

const DataContainer = Styled.div`
    display:grid;
`

const HeaderData = Styled.div`
    display:grid;
    grid-template-columns: 1fr fit-content(100%);
`

const Name = Styled.span`
    font-family: Bold;
    color: ${Colors.DARK_500};
`

const Price = Styled.span`
    font-family: Bold;
    color: ${Colors.DARK_500};
`

const TextContainer = Styled.div`
    display:grid;
    row-gap: 2px;
`

const DeleteButton = Styled.button`
    display:grid;
    align-items:center;
    justify-content:center;
    background-color: ${Colors.GRAY_500};
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    svg {
        width: 16px;
        height: 16px;
    }
`

const BottomData = Styled.div`
    display:grid;
    grid-template-columns: 1fr fit-content(100%);
    align-items:center;
`

const AddButton = Styled.button`

    display:grid;
    justify-content:center;
    align-items:center;
    width: 24px;
    height: 24px;
    border-radius: 5px;
    border: none;
    background-color: ${Colors.PRIMARY_500};

    svg{
        width: 16px;
        height: 16px;
    }

    svg path{
        stroke: white;
    }
`

const EditQuantityContainer = Styled.div`
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
    font-size: 10px;
    height: 24px;
    font-family: Medium;
    color: ${Colors.DARK_500};
    background-color: ${Colors.GRAY_300};
    width: 24px;
`

export function CartCardSkeleton() {
    return (
        <ContainerSkeleton>
            <Skeleton width={75} height={75} style={{ borderRadius: 5 }} />
            <TextContainerSkeleton>
                <Skeleton height={20} />
                <Skeleton height={35} />
            </TextContainerSkeleton>
        </ContainerSkeleton>
    )
}

const ContainerSkeleton = Styled.div`
    display:grid;
    grid-template-columns: fit-content(100%) 1fr;
    height: fit-content;
    column-gap: 16px;
    box-sizing: border-box;
`

const TextContainerSkeleton = Styled.div`
    display:grid;
    row-gap: 2px;
`