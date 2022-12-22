import type {NextPage} from 'next'
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import useSpotify from '../../hooks/useSpotify'
import Collection from '../../components/Collection'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified

const Playlists: NextPage = () => {

    const {data: session} = useSession()
    const spotifyApi = useSpotify()
    const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([])

    useEffect(() => {
        if (!spotifyApi.getAccessToken()) return

        async function loadItems() {

            const limit = 50
            let offset = 0
            let next: string | null = null
            let items: PlaylistObjectSimplified[] = []

            do {
                const {body} = await spotifyApi.getUserPlaylists({limit, offset})
                next = body.next
                offset += limit
                items = [...items, ...body.items]
            } while (next)

            return items
        }

        loadItems().then(setPlaylists)

    }, [session, spotifyApi])

    const user = session?.user
    if (!user || !playlists.length) {
        return null
    }

    return (
        <Collection
            collectionName="Playlists"
            user={user}
            items={playlists.map(playlist => {
                const {id, images, name: title, description} = playlist
                const url = `/playlist/${id}`
                const imageUrl = images[0].url
                return {id, url, imageUrl, title, description: description || ''}
            })}
        />
    )
}

export default Playlists
