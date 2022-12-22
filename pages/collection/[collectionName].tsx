import type {NextPage} from 'next'
import Topbar from '../../components/Topbar'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {ArrowDownTrayIcon} from '@heroicons/react/24/outline'
import useSpotify from '../../hooks/useSpotify'
import Card from '../../components/Card'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified

const Collection: NextPage = () => {

    const router = useRouter()
    const collectionName = capitalizeFirstLetter(router.query.collectionName as string || '')

    const {data: session} = useSession()
    const spotifyApi = useSpotify()
    const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([])

    useEffect(() => {
        if (!spotifyApi.getAccessToken()) return

        spotifyApi.getUserPlaylists().then(data => {
            const {body: {items}} = data
            setPlaylists(items)
        })
    }, [session, spotifyApi])

    const user = session?.user
    if (!user) {
        return null
    }

    function exportPlaylist() {
        if (!playlists.length) {
            return
        }

        download('playlists.json', {
            playlists: playlists.map(({id, name}) => ({id, name})),
        })
    }

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <Topbar user={user} isLibrary={true}/>
            <section className="px-8">
                <div className="flex items-center my-4 text-white">
                    <h1 className="flex-grow text-2xl font-bold">{collectionName}</h1>
                    <button
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => exportPlaylist()}
                    >
                        <h2>Export</h2>
                        <ArrowDownTrayIcon className="h-5 w-5"/>
                    </button>
                </div>
                <div
                    className="grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-6">
                    {playlists.map(playlist => {
                        const {id, images, name, description} = playlist
                        const url = `/playlist/${id}`
                        const imageUrl = images[0].url

                        return <Card key={id} url={url} imageUrl={imageUrl} title={name}
                                     description={description || ''}/>
                    })}
                </div>
            </section>
        </div>
    )
}

function download(filename: string, data: object) {
    const element = document.createElement('a')
    const text = JSON.stringify(data, null, 2)
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}

function capitalizeFirstLetter(text: string) {
    return text?.length
        ? text.charAt(0).toUpperCase() + text.slice(1)
        : text
}

export default Collection
