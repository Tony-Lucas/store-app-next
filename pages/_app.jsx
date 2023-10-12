
import Head from "next/head";
import "../public/css/global.css"
import 'bootstrap/dist/css/bootstrap.css'
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }) {
    return (

        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>

    )

}
