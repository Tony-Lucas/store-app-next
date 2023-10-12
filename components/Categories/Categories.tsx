
import Styled from "styled-components"
import Colors from "../../public/colors.json"
import { Dispatch, SetStateAction } from "react"

interface categoriesI {
    categories: string[]
    active: string
    setActive: Dispatch<SetStateAction<string>>;
}

export default function Categories({ categories, active, setActive }: categoriesI) {
    return (
        <Container className="d-flex">
            {categories.map(category => {
                return (
                    <Category onClick={() => setActive(category)} active={active === category}>{category}</Category>
                )
            })}
        </Container>
    )
}

const Container = Styled.div`

    width: calc(100vw - 24px);
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-right: 24px;
    column-gap: 24px;
    scrollbar-width: none;  /* Firefox */
    -webkit-overflow-scrolling: touch;
    
    span {
        flex: 0 0 auto;
    }
    
`

const Category = Styled.span<{ active: boolean }>`
    font-family: Semibold;
    color: ${props => props.active ? Colors.PRIMARY_900 : Colors.GRAY_900};
    font-size: 16px;
    user-select: none;
    cursor: pointer;
`