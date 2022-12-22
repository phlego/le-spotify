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
        spotifyApi.getMySavedShows().then(data => setPodcasts(data.body.items.map(item => item.show)))
    }, [session, spotifyApi])

    const user = session?.user
    if (!user || !podcasts.length) {
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
        />
    )
}

export default Podcasts
