import type {NextPage} from 'next'
import useSpotify from '../../hooks/useSpotify'
import {useRecoilState} from 'recoil'
import {playlistState} from '../../atoms/playlistAtom'
import {useEffect, useState} from 'react'
import {shuffle} from 'lodash'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import Topbar from '../../components/Topbar'
import Songs from '../../components/Songs'

const DEFAULT_COLOR = 'from-green-500'
const COLORS = [
    'from-red-500',
    'from-orange-500',
    'from-amber-500',
    'from-yellow-500',
    'from-lime-500',
    'from-green-500',
    'from-emerald-500',
    'from-teal-500',
    'from-cyan-500',
    'from-sky-500',
    'from-blue-500',
    'from-indigo-500',
    'from-violet-500',
    'from-purple-500',
    'from-fuchsia-500',
    'from-pink-500',
    'from-rose-500',
]

const Playlist: NextPage = () => {

    const router = useRouter()
    const playlistId = router.query.playlistId as string || ''

    const spotifyApi = useSpotify()
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    useEffect(() => {
        if (!spotifyApi.getAccessToken()) {
            return
        }

        spotifyApi.getPlaylist(playlistId).then(data => {
            const {body: playlist} = data
            setPlaylist(playlist)
        })
    }, [spotifyApi, playlistId])

    const [color, setColor] = useState(DEFAULT_COLOR)
    useEffect(() => {
        const chosenColor = shuffle(COLORS).pop() || DEFAULT_COLOR
        setColor(chosenColor)
    }, [playlistId])

    const {data: session} = useSession()
    const user = session?.user
    if (!user || !playlist) {
        return null
    }

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <Topbar user={user}/>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8 text-white`}>
                <img
                    className="h-44 w-44 shadow-2xl"
                    src={playlist.images?.[0]?.url}
                    alt="PlaylistId"
                />
                <div>
                    <p className="text-xs">PLAYLIST</p>
                    <h1 className="text-2xl md:text-4xl xl:text-6xl font-bold select-none">{playlist.name}</h1>
                </div>
            </section>

            <Songs/>
        </div>
    )
}

export default Playlist
