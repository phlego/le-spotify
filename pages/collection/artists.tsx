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
        spotifyApi.getFollowedArtists({limit: 50})
            .then(data => setArtists(data.body.artists.items))
    }, [session, spotifyApi])

    const user = session?.user
    if (!user || !artists.length) {
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
        />
    )
}

export default Podcasts
