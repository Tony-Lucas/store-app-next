
import Styled from "styled-components"
import Colors from "../../public/colors.json"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router"
import { IconButton } from "../Button/Buttons"
import { AddIcon } from "../../public/icons/Icons"
import { productCartI, productI } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";
import { filterByCartProduct } from "../../utils/localStorageUtil";

interface productCardI {
    data: productI
}

export default function ProductCard({ data }: productCardI) {
    
    const router = useRouter()

    return (
        <Container data-testid="product" onClick={() => null} key={data.id}>
            <ImageContainer>
                <Image alt="ddd" src={data.imgUrl || "/img/defaultImg.jpg"} data-testid="product-img" width={0} height={0} sizes="100%" style={{width: "100%",height: "150px",borderRadius: "5px"}} onClick={() => router.push(`/product/${data.id}`)} />
            </ImageContainer>
            <TextContainer>
                <Name data-testid="product-name" onClick={() => router.push(`/product/${data.id}`)}>{data.name}</Name>
                <Description onClick={() => router.push(`/product/${data.id}`)}>{data.description || "Produto sem descriçãoddddddddddddddddddddd"}</Description>
                <Price data-testid="product-price">R$ {data.priceRetail.toString().replace(".", ",")}</Price>
            </TextContainer>
        </Container>
    )
}

const Container = Styled.div`
    display:grid;
    row-gap: 16px;
    height: fit-content;
`

const ImageContainer = Styled.div`
    background-color: rgba(179,192,209,0.3);
    border-radius: 5px;
    
    display:grid;
    justify-content:center;
`

const TextContainer = Styled.div`
    display:grid;
    row-gap: 4px;
`

const Name = Styled.span`
    font-family: Semibold;
    color: ${Colors.DARK_500};
    font-size: 16px;
`

const Description = Styled.span`
    font-family: Regular;
    color: ${Colors.GRAY_700};
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`

const Price = Styled.span`
    font-family: Bold;
    color: ${Colors.DARK_500};
    font-size: 14px;
`

const ContainerAddButton = Styled.div<{ quantity: boolean }>`
    display:grid;
    justify-content: end;
    column-gap: ${props => props.quantity ? "4px" : "0px"};
    grid-template-columns: ${props => props.quantity ? "repeat(3,fit-content(100%))" : "fit-content(100%)"};
    align-items:center;
`

export function CardSkeleton() {
    return (
        <ContainerSkeleton>
            <Skeleton width={"100%"} height={100} style={{ borderRadius: 5 }} />
            <TextContainer>
                <Skeleton height={20} />
                <Skeleton height={35} />
            </TextContainer>
            <Skeleton height={30} />

        </ContainerSkeleton>
    )
}

const ContainerSkeleton = Styled.div`
    display:grid;
    height: fit-content;
    row-gap: 16px;
    box-sizing: border-box;
    
`