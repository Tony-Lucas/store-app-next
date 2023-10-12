
import { render, screen } from '@testing-library/react'
import { PrimaryMediumButton } from './Buttons'

describe("test button", () => {
    it("should have text", () => {
        render(
            <PrimaryMediumButton>Butão</PrimaryMediumButton>
        )
        expect(screen.getByText("Butão")).toBeTruthy()
    })
    it("should render loading when prop loading is true",() => {
        render(<PrimaryMediumButton loading={true}>Butão</PrimaryMediumButton>);
        expect(screen.getByTestId("loading")).toBeTruthy()
    })
    
})