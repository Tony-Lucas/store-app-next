import { Input, SearchInput } from "../components/Input/Input";
import ProductCard, { CardSkeleton } from "../components/ProductCard/ProductCard";
import TabNavigation from "../components/TabNavigation/TabNavigation";
import DefaultLayout from "../layout/defaultLayout";
import Styled from 'styled-components'
import { useEffect } from "react"
import axios from "../axios/axiosInstance"
import { useState } from "react"
import Categories from "../components/Categories/Categories";
import Colors from "../public/colors.json"
import { productCartI, productI } from "../interfaces/interfaces";
import WalkThrough from "../components/WalkThrough/WalkThrough";

export default function Home() {

    const [active, setActive] = useState<string>("Todos")
    const [products, setProducts] = useState<productI[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showWalk, setShowWalk] = useState<boolean>(false)

    useEffect(() => {
        axios.get(`/product/limit/${0}`).then(result => {
            setProducts(result.data.product)
            setLoading(false)
            axios.get("/auth").then(resultAuth => {
                if (resultAuth.data.userClaim.FirstLogin) {
                    setShowWalk(true)
                }
            })
        })
    }, [])

    const getTenProducts = () => {
        if (products.length >= 10) {
            axios.get(`/product/limit/${products.length}`).then(result => {
                setProducts([...products, result.data.product])
                setLoading(false)
            })
        }
    }

    return (
        <DefaultLayout styles={{ padding: "24px 0px 0px 24px" }} onScroll={getTenProducts}>
            <Container className="d-flex flex-column">
                <HeaderContainer>
                    <Title>Catálogo</Title>
                    <SearchInput />
                </HeaderContainer>
                <Categories categories={["Todos", "Potes", "Lixeiras", "Utensílios", "Outros", "Outros"]} active={active} setActive={setActive} />
                <ContainerProducts>
                    {products.map((product: productI) => {
                        return (
                            <ProductCard data={product} key={product.id} />
                        )
                    })}
                </ContainerProducts>
                {loading && (
                    <ContainerProducts>
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </ContainerProducts>
                )}
            </Container>
            
            <WalkThrough />
            

        </DefaultLayout>
    )
}

const ContainerProducts = Styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    padding-right: 24px;
    row-gap: 24px;
    height: fit-content;
    
`

const HeaderContainer = Styled.div`
    display:grid;
    row-gap: 16px;
    padding-right: 24px;
`

const Container = Styled.div`
    row-gap: 16px;
`

const Title = Styled.span`
    font-family: Extrabold;
    font-size: 24px;
    color: ${Colors.DARK_500};
`
