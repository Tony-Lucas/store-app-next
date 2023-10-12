
import Styled from "styled-components"
import TabNavigation from "../components/TabNavigation/TabNavigation"
import { MouseEvent } from "react"

interface defaultLayoutI {
    children: React.ReactNode,
    styles?: any,
    onScroll?: () => void
}

export default function DefaultLayout({ children, styles, onScroll }: defaultLayoutI) {

    const onScrollEnd = () => {
        const defaultLayout: any = document.querySelector("#default-layout")
        if (defaultLayout.offsetHeight + defaultLayout.scrollTop >= defaultLayout.scrollHeight) {
            console.log("aluyrururu")
        }
    }

    return (
        <Container id="default-layout" onScroll={() => onScrollEnd()}>
            <ChildrenContainer>
                {children}
            </ChildrenContainer>
            <TabNavigation />
        </Container>
    )
}

const Container = Styled.div<{ haveStyle?: boolean }>`
    display:grid;
    box-sizing: border-box;
`

const ChildrenContainer = Styled.div`
    padding-left: 24px;
    padding-top: 24px;
    padding-bottom: 24px;
    overflow-y: auto;
    height: calc(100vh - 64px);
`