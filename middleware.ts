import { NextRequest, NextResponse } from 'next/server'


export async function middleware(request: NextRequest) {
    try {
        const result = await fetch("http://localhost:8080/auth", { headers: { "Cookie": `token=${request.cookies.get("token")?.value}` }, credentials: "include" })
        const json = await result.json()
        console.log(json)
        if (json.success) {
            if (request.url.includes("/login")) {
                return NextResponse.rewrite(new URL("/", request.url))
            } else {
                return NextResponse.next()
            }
        } else {
            if (request.url.includes("/basket") || request.url.includes("/profile")) {
                return NextResponse.redirect(new URL("/login", request.url))
            } else {
                return NextResponse.next()
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}