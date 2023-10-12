
import Styled from "styled-components"
import Colors from "../../public/colors.json"
import { ReactNode } from "react"
import { LoadingIcon } from "../../public/icons/Icons"

interface ButtonI {
    children: ReactNode,
    loading?: boolean,
    onClick: () => void,
}

interface ButtonSubmitI {
    children: ReactNode,
    loading?: boolean,
}

const MediumButton = Styled.button`
    font-family: "Medium";
    height: 40px;
    font-family: 14px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
`

const PrimaryMediumButtonStyle = Styled(MediumButton)`
    background-color: ${Colors.PRIMARY_500};
    border: 1px solid transparent;
    color: white;
    padding: 0px 16px;
`

export function PrimaryMediumButton({ children, loading, onClick }: ButtonI) {

    return (
        <PrimaryMediumButtonStyle onClick={() => onClick()} >
            {loading && (
                <LoadingIcon width="20" height="20" data-icon="loading" />
            )}
            {!loading && (
                <>{children}</>
            )}
        </PrimaryMediumButtonStyle>
    )
}

export function SubmitButton({ children, loading }: ButtonSubmitI) {
    return (
        <PrimaryMediumButtonStyle type="submit">
            {loading && (
                <LoadingIcon width="20" height="20" data-icon="loading" />
            )}
            {!loading && (
                <>{children}</>
            )}
        </PrimaryMediumButtonStyle>
    )
}

interface IconButtonI {
    children: React.ReactNode,
    onClick: () => void
}

export function IconButton({ children,onClick }: IconButtonI) {
    return (
        <IconButtonElement onClick={() => onClick()}>{children}</IconButtonElement>
    )
}

const IconButtonElement = Styled.button`

    width: 30px;
    height: 30px;
    display:grid;
    align-items:center;
    justify-content:center;
    background-color: ${Colors.PRIMARY_500};
    border: none;
    border-radius: 5px;

    svg {
        width: 16px;
        height: 16px;
    }

    svg path{
        stroke: white;
        stroke-width: 2px;
    }
`

export function MediumIconButton({ children,onClick }: IconButtonI) {
    return (
        <LargeIconButtonElement onClick={() => onClick()}>{children}</LargeIconButtonElement>
    )
}

const LargeIconButtonElement = Styled.button`
    height: 40px;
    width: 40px;
    display:grid;
    align-items:center;
    justify-content:center;
    background-color: ${Colors.PRIMARY_500};
    border: none;
    border-radius: 5px;
    padding: 0px 16px;
    color: white;
    svg {
        width: 20px;
        height: 20px;
    }

    svg path{
        stroke: white;
        stroke-width: 2px;
    }
`


export function TerciaryMediumButton({ children,onClick }: IconButtonI) {
    return (
        <MdTerciaryButton onClick={() => onClick()}>{children}</MdTerciaryButton>
    )
}

const MdTerciaryButton = Styled(MediumButton)`
    background-color: transparent;
    color: ${Colors.PRIMARY_500};
    border: none;
`

export function TerciaryIconButtonSm({ children,onClick }: IconButtonI) {
    return (
        <SmTerciaryIconButton onClick={() => onClick()}>{children}</SmTerciaryIconButton>
    )
}

const SmTerciaryIconButton = Styled.button`
    display:grid;
    justify-content:center;
    align-items:center;
    background-color: transparent;
    height: 32px;
    width: 32px;
    border: none;
    
    svg {
        width: 24px;
        height: 24px;
    }
`