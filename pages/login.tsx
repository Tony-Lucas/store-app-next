
import Styled from 'styled-components';
import Colors from "../public/colors.json"
import { Input } from '../components/Input/Input';
import { useState } from 'react';
import { PrimaryMediumButton, SubmitButton } from '../components/Button/Buttons';
import axios from "../axios/axiosInstance"
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import Form from '../components/Form/Form';

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        setLoading(true)
        const result = await axios.post("/auth", { ...data })
        if(result.data.success){
            router.push("/")
            setLoading(false)
        }else{
            setLoading(false)
        }
    }

    return (
        <MainContainer className='d-flex flex-column justify-content-between vh-100'>
            <div></div>
            <Container>
                <Logo>Logo</Logo>
                <HeaderContainer>
                    <HeadingOne>Bem vindo,</HeadingOne>
                    <HeadingTwo>Entre na sua conta</HeadingTwo>
                </HeaderContainer>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputsContainer>
                        <Input label="Email" placeholder="email@email.com" registerProps={{ ...register("indentifier", { required: true }) }} errors={errors.email} />
                        <Input type="password" label="Senha" placeholder='senha123' showPassword={true} registerProps={{ ...register("password", { required: true }) }} errors={errors.password} />
                    </InputsContainer>
                    <SubmitButton loading={loading}>Entrar</SubmitButton>
                </Form>
                <ForgotPassword>Esqueceu a senha ?</ForgotPassword>
            </Container>
            <Register onClick={() => router.push("/register")}>Ainda não possui uma conta ?</Register>
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

const HeadingTwo = Styled.span`
    font-family: Semibold;
    color: ${Colors.DARK_500};
    font-size: 26px;
`

const ForgotPassword = Styled.span`
    font-family: Regular;
    color: ${Colors.DARK_500};
    text-align: right;
    cursor: pointer;
`

const Register = Styled.span`
    font-family: Regular;
    color: ${Colors.DARK_500};
    text-align: center;
    cursor: pointer;
`