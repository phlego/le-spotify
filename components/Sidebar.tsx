import {
    BookmarkIcon,
    HeartIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PlusCircleIcon,
    QueueListIcon,
} from '@heroicons/react/24/outline'
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import useSpotify from '../hooks/useSpotify'
import Link from 'next/link'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified

function Sidebar() {

    const {data: session} = useSession()
    const spotifyApi = useSpotify()
    const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([])

    useEffect(() => {
        if (!spotifyApi.getAccessToken()) {
            return
        }

        spotifyApi.getUserPlaylists().then(data => {
            const {body: {items}} = data
            setPlaylists(items)
        })

    }, [session, spotifyApi])

    return (
        <div className="text-gray-500 p-5 border-r border-gray-900 h-screen overflow-y-scroll scrollbar-hide
                        text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <div className="space-y-4">
                <Link href="/" className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Home</p>
                </Link>
                <button className="flex items-center space-x-2 hover:text-white">
                    <MagnifyingGlassIcon className="h-5 w-5"/>
                    <p>Search</p>
                </button>
                <Link href="/collection/playlists" className="flex items-center space-x-2 hover:text-white">
                    <QueueListIcon className="h-5 w-5 rotate-90"/>
                    <p>Your Library</p>
                </Link>
                <hr className="border-t-[1px] border-gray-900"/>

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5"/>
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5"/>
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <BookmarkIcon className="h-5 w-5"/>
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t-[1px] border-gray-900"/>

                {playlists.map(playlist => {
                    const {id, name} = playlist
                    return (
                        <Link
                            key={id}
                            href={`/playlist/${id}`}
                            className="block cursor-default hover:text-white"
                        >
                            {name || id}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar