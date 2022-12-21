import {atom} from 'recoil';
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse;

export const playlistState = atom<SinglePlaylistResponse | null>({
    key: 'playlistState',
    default: null
})

export const playlistIdState = atom({
    key: 'playlistIdState',
    default: '5WzDvBWU8KNWczlvoPDMQs'
})