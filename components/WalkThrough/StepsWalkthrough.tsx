
import Colors from "../../public/colors.json"
import Styled from "styled-components"
import { PrimaryMediumButton } from "../Button/Buttons"
import { AddToCartIllustration, AdressDeliver, GetDeliverIllustration } from "../../public/icons/Icons"
import { animated } from "@react-spring/web"

export function AddToCartStep(props: any) {
    return (
        <DefaultLayout style={props.style} onClick={props.onClick} Illustration={<AddToCartIllustration />} title="Catálogo" explanation="Navegue por nosso catálogo e encontre centenas de produtos" />
    )
}

export function AddAdressStep(props: any) {
    return (
        <DefaultLayout style={props.style} onClick={props.onClick}  Illustration={<AdressDeliver />} title="Endereço" explanation="Adicione o endereço onde você receber seus produtos" />
    )
}

export function GetProductStep(props: any) {
    return (
        <DefaultLayout style={props.style} onClick={props.onClick} Illustration={<GetDeliverIllustration />} title="Receba" explanation="Vai ao local escolhido e receba seus produtos" />
    )
}

interface defaultLayoutI {
    Illustration: React.ReactElement,
    title: string,
    explanation: string,
    onClick: () => void,
    style: any
}

export function DefaultLayout({ Illustration, title, explanation, onClick,style }: defaultLayoutI) {
    return (
        <>
            <Container as={animated.div} style={style}>
                <Body>
                    {Illustration}
                    <TextContainer>
                        <Title>{title}</Title>
                        <Explanation>{explanation}</Explanation>
                    </TextContainer>
                </Body>
            </Container>
        </>
    )
}


const Container = Styled.div`
    display:flex;
    background-color: white;
    flex-direction: column;
    
    width: 100%;
    justify-content:center;
    grid-template-rows: fit-content(100%) 1fr fit-content(100%);
    padding: 24px;
`



const Body = Styled.div`
    display:grid;
    row-gap: 24px;

    svg {
        width: 100%;
        height: 250px;
        view-box: 0 0 200 200;
    }
`


const Title = Styled.span`
    font-family: Extrabold;
    color: ${Colors.DARK_500};
    font-size: 24px;
`

const Explanation = Styled.span`
    font-family: Regular;
    color: ${Colors.GRAY_900};
    font-size: 16px;
`

const TextContainer = Styled.div`
    display:grid;
    row-gap: 8px;
    text-align:center;
    padding: 0px 24px;
`

