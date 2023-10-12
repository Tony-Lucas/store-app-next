
import { useForm } from "react-hook-form";
import Styled from "styled-components"

interface FormI {
    onSubmit: (data: any) => void,
    children: React.ReactNode
}

export default function Form({ onSubmit, children }: FormI) {

    const { handleSubmit } = useForm();

    return (
        <FormElement onSubmit={onSubmit}>
            {children}
        </FormElement>
    )
}

const FormElement = Styled.form`
    display:grid;
    row-gap: 24px;
`