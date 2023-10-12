
import Styled from "styled-components"
import Colors from "../../public/colors.json"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { CatalogIcon, DiscoverIcon, ProfileIcon, ShopBasketIcon } from "../../public/icons/Icons"
import { getCookie } from 'cookies-next';
import axios from "../../axios/axiosInstance"

interface tabNavigationI {

}

export default function TabNavigation({ }: tabNavigationI) {

    const [active, setActive] = useState<string>("/")

    const { pathname, route, push } = useRouter()
    useEffect(() => {
        setActive(pathname)
    }, [pathname])

    const changeRoute = async (path: string) => {

        if (path != "/profile" && path != "/cart") {
            push(path)
        } else {
            const resultVerifyAuth = await axios.get("/auth")
            if (resultVerifyAuth.data.success) {
                push(path)
            } else {
                push("/login")
            }
        }
    }

    return (
        <Container className="d-flex justify-content-between align-items-center">
            <Item onClick={() => changeRoute("/")} isActive={active === "/" ? true : false}><CatalogIcon />{active === "/" ? "Catálogo" : ""}</Item>
            <Item onClick={() => changeRoute("/categories")} isActive={active === "/categories" ? true : false}><DiscoverIcon />{active === "/categories" ? "Categorias" : ""}</Item>
            <Item onClick={() => changeRoute("/cart")} isActive={active === "/cart" ? true : false}><ShopBasketIcon />{active === "/cart" ? "Carrinho" : ""}</Item>
            <Item onClick={() => changeRoute("/profile")} isActive={active === "/profile" ? true : false}><ProfileIcon />{active === "/profile" ? "Conta" : ""}</Item>
        </Container>
    )
}

const Container = Styled.div`
    width: 100vw;
    position: fixed;
    left: 0;
    z-index: 10;
    bottom: 0;
    height: 64px;
    background-color: white;
    border-top: 1px solid ${Colors.GRAY_300};
    padding: 0px 24px;
    box-sizing: border-box;
`

interface itemI {
    children: React.ReactNode
    isActive: boolean,
    onClick: () => void
}

function Item({ children, isActive, onClick }: itemI) {
    return (
        <ItemContainer isActive={isActive} onClick={() => onClick()}>
            {children}
        </ItemContainer>
    )
}

const ItemContainer = Styled.span<{ isActive: boolean }>`
    display:grid;
    grid-template-columns: ${props => props.isActive ? "repeat(2,fit-content(100%))" : "fit-content(100%)"};
    align-items:center;
    cursor: pointer;
    column-gap: 8px;
    font-family: Medium;
    color: ${Colors.DARK_500};
    padding: 8px 16px;
    background-color: ${props => props.isActive ? "#FFF0F7" : "transparent"};
    border-radius: 5px;
    
`