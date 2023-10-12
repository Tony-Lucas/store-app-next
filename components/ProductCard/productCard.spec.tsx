
import {screen,render, fireEvent} from "@testing-library/react"
import ProductCard from "./ProductCard"
import { productI } from "../../interfaces/interfaces"
import { useRouter } from "next/router"
import { createMockRouter } from "../../__mocks__/routerMock"
import { RouterContext } from "next/dist/shared/lib/router-context"

describe("test component product card",() => {

    const productData: productI = {
        id: 1,
        name: "Pimbada",
        description: "Ai que delicia",
        priceRetail: 2.35,
        priceWholesale: 1.50,
    }

    it("should render product name",() => {
        render(
            <RouterContext.Provider value={createMockRouter({})}>
                <ProductCard data={productData}/>
            </RouterContext.Provider>
        )
        expect(screen.getByText("Pimbada")).toBeInTheDocument()
    })
    it("should render description name",() => {
        render(
            <RouterContext.Provider value={createMockRouter({})}>
                <ProductCard data={productData}/>
            </RouterContext.Provider>
        )
        expect(screen.getByText("Ai que delicia")).toBeInTheDocument()
    })
    it("should render priceRetail name",() => {
        render(
            <RouterContext.Provider value={createMockRouter({})}>
                <ProductCard data={productData}/>
            </RouterContext.Provider>
        )
        expect(screen.getByText("R$ 2.35")).toBeInTheDocument()
    })
    it("should render imgUrl name",() => {
        render(
            <RouterContext.Provider value={createMockRouter({})}>
                <ProductCard data={productData}/>
            </RouterContext.Provider>
        )
        expect(screen.getByTestId("product-img")).toBeInTheDocument()
    })
    it("should img url contains defaultImg string",() => {
        render(
            <RouterContext.Provider value={createMockRouter({})}>
                <ProductCard data={productData}/>
            </RouterContext.Provider>
        )
        expect(screen.getByTestId("product-img").getAttribute("src")).toContain("defaultImg")
    })
    it("should render imgUrl name",() => {
        render(
            <RouterContext.Provider value={createMockRouter({})}>
                <ProductCard data={productData}/>
            </RouterContext.Provider>
        )
        fireEvent(screen.getByRole("button"),new MouseEvent("Click"))
        expect(window.localStorage.getItem("Tonhao")).not.toBeNull()
    })
})