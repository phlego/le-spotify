import type {NextPage} from 'next'
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import useSpotify from '../../hooks/useSpotify'
import Collection from '../../components/Collection'
import ShowObjectSimplified = SpotifyApi.ShowObjectSimplified

const Podcasts: NextPage = () => {

    const {data: session} = useSession()
    const spotifyApi = useSpotify()
    const [podcasts, setPodcasts] = useState<ShowObjectSimplified[]>([])

    useEffect(() => {
        if (!spotifyApi.getAccessToken()) return

        async function loadItems() {

            const limit = 50
            let offset = 0
            let next: string | null = null
            let items: ShowObjectSimplified[] = []

            do {
                const {body} = await spotifyApi.getMySavedShows({limit, offset})
                next = body.next
                offset += limit
                items = [...items, ...body.items.map(item => item.show)]
            } while (next)

            return items
        }

        loadItems().then(setPodcasts)

    }, [session, spotifyApi])

    const user = session?.user
    if (!user) {
        return null
    }

    return (
        <Collection
            collectionName="Podcasts"
            user={user}
            items={podcasts.map(podcast => {
                const {id, images, name: title, description} = podcast
                const url = `/show/${id}`
                const imageUrl = images[0].url
                return {id, url, imageUrl, title, description: description || ''}
            })}
            fileImporter={async (file: string) => {
                const podcasts = JSON.parse(file).podcasts
                if (!podcasts) {
                    console.warn('No podcasts found!')
                    return
                }

                await spotifyApi.addToMySavedShows(podcasts.map(p => p.id))
                alert('Import completed 👍')
            }}
        />
    )
}

export default Podcasts
