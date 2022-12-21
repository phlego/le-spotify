import TrackObjectFull = SpotifyApi.TrackObjectFull
import {millisToMinutesAndSeconds} from '../lib/time'
import {useRecoilState} from 'recoil'
import {currentTrackIdState, isPlayingState} from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'

interface SongProps {
    order: number
    track: TrackObjectFull | null
}

function Song({order, track}: SongProps) {

    const spotifyApi = useSpotify()
    const [_currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [_isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    if (!track) {
        return null
    }

    const playSong = () => {
        setCurrentTrackId(track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.uri],
        })
    }

    const artists = track.artists.map(a => a.name).join(', ')

    return (
        <div
            className="grid grid-cols-2 text-gray-500 hover:bg-gray-900 py-4 px-5 rounded cursor-default select-none"
            onDoubleClick={() => playSong()}
        >
            <div className="flex items-center space-x-4">
                <p>{order}</p>
                <img
                    className="h-10 w-10"
                    src={track.album.images[0].url}
                    alt="album"
                />
                <div>
                    <p className="w-36 lg:w-64 truncate text-white" title={track.name}>{track.name}</p>
                    <p className="w-36 lg:w-64 truncate" title={artists}>{artists}</p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden md:inline">{track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song