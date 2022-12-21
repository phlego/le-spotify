import type {NextPage} from 'next'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Head from 'next/head'

const Home: NextPage = () => {
    return (
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
                <Sidebar/>
                <Center/>
            </main>
        </div>
    )
}

export default Home
