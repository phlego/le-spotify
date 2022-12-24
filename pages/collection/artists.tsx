import type {NextPage} from 'next'
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import useSpotify from '../../hooks/useSpotify'
import Collection from '../../components/Collection'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull

const Podcasts: NextPage = () => {

    const {data: session} = useSession()
    const spotifyApi = useSpotify()
    const [artists, setArtists] = useState<ArtistObjectFull[]>([])

    useEffect(() => {
        if (!spotifyApi.getAccessToken()) return

        async function loadItems() {

            const limit = 50
            let after: string | undefined
            let next: string | null = null
            let items: ArtistObjectFull[] = []

            do {
                const {body: {artists}} = await spotifyApi.getFollowedArtists({limit, after})
                next = artists.next
                after = artists.cursors.after
                items = [...items, ...artists.items]
            } while (next)

            return items
        }

        loadItems().then(setArtists)

    }, [session, spotifyApi])

    const user = session?.user
    if (!user) {
        return null
    }

    return (
        <Collection
            collectionName="Artists"
            user={user}
            items={artists.map(artist => {
                const {id, images, name: title} = artist
                const url = `/artist/${id}`
                const imageUrl = images[0].url
                return {id, url, imageUrl, title, description: 'Artist'}
            })}
            fileImporter={async (file: string) => {
                const artists = JSON.parse(file).artists
                if (!artists) {
                    console.warn('No artists found!')
                    return
                }

                await spotifyApi.followArtists(artists.map(p => p.id))
                alert('Import completed 👍')
            }}
        />
    )
}

export default Podcasts
