import Styled from "styled-components"
import { CheckIcon } from "../../public/icons/Icons"
import Colors from "../../public/colors.json"

interface colorCircleI {
    bgColor: string,
    checked: boolean
}

export default function ColorCircle({ bgColor, checked }: colorCircleI) {
    return (
        <Circle bgColor={bgColor}>
            {checked && (
                <CheckIcon width="20" height="20" />
            )}
        </Circle>
    )
}

const Circle = Styled.div<{ bgColor: string }>`
    display:grid;
    justify-content:center;
    align-items:center;
    width: 40px;
    height: 40px;
    background-color: ${props => props.bgColor};
    border-radius: 5px;

    svg path{
        stroke: ${Colors.DARK_500};
    }
`