
import Styled from "styled-components"
import Colors from "../../public/colors.json"
import InputMask from 'react-input-mask';
import { EyeIcon, EyeSlashIcon, SearchIcon } from "../../public/icons/Icons";
import { useState } from "react";
import { MediumIconButton } from "../Button/Buttons";

interface InputI {
    label?: string
    placeholder?: string,
    registerProps?: any,
    errors?: any,
    type?: string,
    showPassword?: boolean
}

interface InputMaskI {
    label?: string
    placeholder?: string,
    registerProps?: any,
    errors?: any,
    type?: string,
    mask: string
}


const InputDefault = Styled.input`

    background-color:white;
    border: 1px solid ${Colors.GRAY_500};
    border-radius: 5px;
    height: 40px;
    padding: 0px 36px 0px 16px;
    font-family: Regular;
    color: ${Colors.DARK_500};
    font-size: 15px;
    transition: 0.3s;

    &:focus{
        border: 1px solid ${Colors.PRIMARY_500};
        outline: none;
    }
    &::placeholder{
        font-family: Regular;
    }
`

const InputElement = Styled(InputDefault)`

`

const Container = Styled.div`
    display:grid;
    row-gap: 4px;
    position: relative;
`

const ContainerMask = Styled.div`
    display:grid;
    row-gap: 4px;

    input {
        background-color:white;
        border: 1px solid ${Colors.GRAY_500};
        border-radius: 5px;
        height: 40px;
        padding: 0px 16px;
        font-family: Regular;
        color: ${Colors.DARK_500};
        font-size: 15px;
        transition: 0.3s;

        &:focus{
            border: 1px solid ${Colors.PRIMARY_500};
            outline: none;
        }
        &::placeholder{
            font-family: Regular;
        }
    }
`

const Label = Styled.span`
    font-family: Semibold;
    font-size: 16px;
    color: ${Colors.DARK_500};
`

const Error = Styled.span`
    font-family: Regular;
    color: #e74c3c;
    text-align:right;
    margin-top:4px;
    font-size: 12px;
`

const EyeButton = Styled.button`
    background-color: transparent;
    border:none;
    position: absolute;
    right: 8px;
    top: 33px;
`

export function Input({ label, placeholder, type, showPassword = false, registerProps, errors }: InputI) {

    const [showPasswordText, setShowPasswordText] = useState<boolean>(false)
    const [inputType, setInputType] = useState(type || "text")

    const onClickEye = () => {
        if (inputType === "text") {
            setInputType("password")
            setShowPasswordText(false)
        } else {
            setInputType("text")
            setShowPasswordText(true)
        }
    }

    return (
        <Container>
            <Label data-testid="label">{label}</Label>
            <InputElement data-testid="input" type={inputType} placeholder={placeholder} {...registerProps} autoComplete="off" />
            {errors && <Error>Campo obrigatório</Error>}
            {showPassword && (
                <EyeButton onClick={() => onClickEye()}>
                    {showPasswordText && (
                        <EyeIcon width="20" height="20" />
                    )}
                    {!showPasswordText && (
                        <EyeSlashIcon width="20" height="20" />
                    )}
                </EyeButton>
            )}
        </Container>
    )
}

export function MaskInput({ label, placeholder, type, mask, registerProps, errors }: InputMaskI) {
    return (
        <ContainerMask>
            <Label data-testid="label">{label}</Label>
            <InputMask mask={mask} placeholder={placeholder} {...registerProps} />
            {errors && <Error>Campo obrigatório</Error>}
        </ContainerMask>
    )
}

export function SearchInput() {
    return (
        <ContainerSearchInput>
            <InputElement />
            <MediumIconButton><SearchIcon /></MediumIconButton>
        </ContainerSearchInput>
    )
}

const ContainerSearchInput = Styled.div`

    border: 1px solid ${Colors.GRAY_500};
    display:grid;
    grid-template-columns: 1fr fit-content(100%);
    border-radius: 5px;
    
    input {
        background-color:white;
        border: 1px solid transparent;
        font-family: Regular;
        color: ${Colors.DARK_500};
        font-size: 15px;
        transition: 0.3s;

        &:focus{
            border: 1px solid transparent;
            outline: none;
        }
        &::placeholder{
            font-family: Regular;
        }
    }
` 