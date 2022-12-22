import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react'
import {RecoilRoot} from 'recoil'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import {useRouter} from 'next/router'

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {

    const router = useRouter()
    const isLoginPage = router.pathname.startsWith('/login')

    return (
        <SessionProvider session={session}>
            <RecoilRoot>
                <div className="bg-black h-screen overflow-hidden font-semibold">
                    <Head>
                        <title>Le Spotify</title>
                        <link rel="icon" sizes="16x16" type="image/png"
                              href="https://open.spotifycdn.com/cdn/images/favicon16.1c487bff.png"/>
                        <link rel="icon" sizes="32x32" type="image/png"
                              href="https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"/>
                        <link rel="icon" href="https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico"/>
                    </Head>
                    <main className="flex">
                        {!isLoginPage && <Sidebar />}
                        <Component {...pageProps} />
                    </main>
                </div>
            </RecoilRoot>
        </SessionProvider>
    )
}

export default MyApp
