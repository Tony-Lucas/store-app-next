import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import "@testing-library/jest-dom"
import { Input } from './Input'
import Colors from "../../public/colors.json"

describe("test input component", () => {
    it("should render label", () => {
       render(<Input label='label' onChange={() => null}/>)
       expect(screen.getByTestId("label").textContent).toBe("label")
    })
    it("should render placeholder",() => {
        render(<Input label='label' placeholder='placeholder' onChange={() => null}/>)
        expect(screen.getByPlaceholderText("placeholder")).toBeTruthy()
    })
})