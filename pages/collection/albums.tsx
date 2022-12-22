import type {NextPage} from 'next'
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import useSpotify from '../../hooks/useSpotify'
import Collection from '../../components/Collection'
import AlbumObjectFull = SpotifyApi.AlbumObjectFull

const Albums: NextPage = () => {

    const {data: session} = useSession()
    const spotifyApi = useSpotify()
    const [albums, setAlbums] = useState<AlbumObjectFull[]>([])

    useEffect(() => {
        if (!spotifyApi.getAccessToken()) return

        async function loadItems() {

            const limit = 50
            let offset = 0
            let next: string | null = null
            let items: AlbumObjectFull[] = []

            do {
                const {body} = await spotifyApi.getMySavedAlbums({limit, offset})
                next = body.next
                offset += limit
                items = [...items, ...body.items.map(item => item.album)]
            } while (next)

            return items
        }

        loadItems().then(setAlbums)

    }, [session, spotifyApi])

    const user = session?.user
    if (!user || !albums.length) {
        return null
    }

    return (
        <Collection
            collectionName="Albums"
            user={user}
            items={albums.map(artist => {
                const {id, images, name: title, artists} = artist
                const url = `/album/${id}`
                const imageUrl = images[0]?.url
                return {id, url, imageUrl, title, description: artists[0].name}
            })}
        />
    )
}

export default Albums
