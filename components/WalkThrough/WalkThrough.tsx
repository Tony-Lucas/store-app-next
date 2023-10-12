
import Styled from "styled-components"
import { AddAdressStep, AddToCartStep, GetProductStep } from "./StepsWalkthrough"
import { isMobile } from "react-device-detect"
import { useEffect, useState, CSSProperties } from "react"
import { AnimatedProps, animated, useSpringRef, useSprings, useTransition } from "@react-spring/web"
import Colors from "../../public/colors.json"
import { PrimaryMediumButton } from "../Button/Buttons"
import axios from "../../axios/axiosInstance"

interface WalkThroughI {

}

export default function WalkThrough({ }: WalkThroughI) {

    const pages: ((props: AnimatedProps<{ style: CSSProperties }>) => React.ReactElement)[] = [
        ({ style }) => <AddToCartStep style={style} />,
        ({ style }) => <AddAdressStep style={style} />,
        ({ style }) => <GetProductStep style={style} />,
    ]

    const [mobile, setMobile] = useState<boolean>(false)
    const [index, set] = useState<number>(0)

    const onClick = () => {
        if(index === 2){
            axios.put("/user/firstLogin").then(resultUpdate => {
                console.log(resultUpdate)
                const container = document.querySelector("#container-walk")
                container?.classList.add("d-none")
            })
        }else{
            set(state => state + 1)
        }
    }

    const transRef = useSpringRef()
    const transStepsRef = useSpringRef()

    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        from: { opacity: 0, transform: "translate3d(100%,0,0)" },
        enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
        leave: { opacity: 1, transform: "translate3d(-100%,0,0)" },
    })

    useEffect(() => {
        transRef.start()
        transStepsRef.start()
    }, [index])

    useEffect(() => {
        setMobile(isMobile)
        axios.get("/auth").then(resultAuth => {
            const container = document.querySelector("#container-walk")
            
            if (resultAuth.data.userClaim.FirstLogin) {
                const container = document.querySelector("#container-walk")
                container?.classList.remove("d-none")
            }else{
                container?.classList.add("d-none")
            }
        })
    }, [])

    return (
        <Container className="d-flex vh-100 vw-100" id="container-walk">
            {transitions((style, i) => {
                const Page = pages[i]
                return (
                    <StepContainer as={animated.div} >
                        <Header>
                            <Skip>Pular</Skip>
                        </Header>
                        <Page style={style} />
                        <Bottom isMobile={mobile}>
                            <StepCircleContainer>
                                
                            </StepCircleContainer>
                            <PrimaryMediumButton onClick={() => onClick()}>{index !== 2 ? "Próximo" : "Entendi"}</PrimaryMediumButton>
                        </Bottom>
                    </StepContainer>

                )
            })}
        </Container>
    )
}

const Container = Styled.div`
    background-color: white;
    position: fixed;
    z-index: 100;
    top: 0;
    left:0;
    
`

const Header = Styled.div`
    display:grid;
    text-align:right;
    padding: 24px;
`

const Skip = Styled.span`
    font-family: Bold;
    color: ${Colors.GRAY_900};
    font-size: 14px;
    cursor: pointer;
`

const StepContainer = Styled.div`
    display:grid;
    position: absolute;
    height: 100vh;
    grid-template-rows: fit-content(100%) 1fr fit-content(100%);
`

const Bottom = Styled.div<{ isMobile: boolean }>`
    display:grid;
    grid-template-columns: repeat(2,fit-content(100%));
    justify-content: space-between;
    align-items:center;
    padding: ${props => props.isMobile ? "0px 24px 64px 24px" : "24px"};
`

const StepCircleContainer = Styled.div`
    display:grid;
    grid-template-columns: repeat(3,fit-content(100%));
    column-gap: 8px;
`

const StepCircleD = Styled.div<{ style: any }>`
    width: 10px;
    border-radius: 500px;
    height: 10px;
    background-color: ${Colors.GRAY_900};
`
