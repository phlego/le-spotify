import {useRecoilValue} from 'recoil'
import {playlistState} from '../atoms/playlistAtom'
import Song from './Song'

function Songs() {

    const playlist = useRecoilValue(playlistState)

    if (!playlist) {
        return null
    }

    const tracks = playlist.tracks.items

    return (
        <div className="flex flex-col px-8 space-y-1 pb-28 text-white">
            {tracks.map(({track}, index) => (
                <Song order={index} track={track}/>
            ))}
        </div>
    )
}

export default Songs