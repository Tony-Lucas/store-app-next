

import Styled from 'styled-components';
import Colors from "../public/colors.json"
import { Input, MaskInput } from '../components/Input/Input';
import { useState } from 'react';
import { PrimaryMediumButton, SubmitButton } from '../components/Button/Buttons';
import axios from "../axios/axiosInstance"
import { useForm } from "react-hook-form";
import Form from '../components/Form/Form';
import { useRouter } from 'next/router';

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()

    const onSubmit = async (data: any) => {
        setLoading(true)
        if(data.password === data.verifyPassword){
            const result = await axios.post("/user",{...data,contacts: [{phoneNumber: data.phoneNumber}]})
            if(result.data.success){
                const resultAuth = await axios.post("/auth",{email: data.email,password: data.password})
                router.push("/")
            }
        }else{

        }
        setLoading(false)
    }

    return (
        <MainContainer className='d-flex flex-column justify-content-center vh-100'>
            <Container>
                <Logo>Logo</Logo>
                <HeaderContainer>
                    <HeadingOne>Criar conta</HeadingOne>
                </HeaderContainer>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputsContainer>
                        <Input label="Name" placeholder="Joãozin" registerProps={{ ...register("name", { required: true }) }} errors={errors.name} />
                        <Input label="Sobrenome" placeholder="Silva" registerProps={{ ...register("lastname", { required: true }) }} errors={errors.lastname} />
                        <MaskInput mask='(99) 99999-9999' label="Telefone" placeholder="(00) 00000-0000" registerProps={{ ...register("phoneNumber", { required: true,minLength: 12 }) }} errors={errors.phoneNumber} />
                        <Input label="Email" placeholder="email@email.com" registerProps={{ ...register("email", { required: true }) }} errors={errors.email} />
                        <Input type="password" label="Senha" placeholder='senha123' registerProps={{ ...register("password", { required: true }) }} errors={errors.password} />
                        <Input type="password" label="Confirmar senha" placeholder='senha123' registerProps={{ ...register("verifyPassword", { required: true }) }} errors={errors.verifyPassword} />
                        <SubmitButton loading={loading}>Salvar</SubmitButton>
                    </InputsContainer>
                </Form>
            </Container>
        </MainContainer>
    )
}

const MainContainer = Styled.div`
    padding: 24px;
`

const Container = Styled.div`
    display:flex;
    flex-direction: column;
    row-gap: 24px;
    box-sizing: border-box;
    justify-content:center;
    
`

const Logo = Styled.span`
    font-family: Extrabold;
    color: ${Colors.DARK_500};
    font-size: 16px;
`

const HeaderContainer = Styled.div`
    display:grid;
`

const InputsContainer = Styled.div`
    display:grid;
    row-gap: 16px;
`

const HeadingOne = Styled.span`
    font-family: Extrabold;
    color: ${Colors.PRIMARY_500};
    font-size: 26px;
`
