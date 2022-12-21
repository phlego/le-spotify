import {signIn, useSession} from 'next-auth/react';
import {useEffect} from 'react';
import spotifyApi from '../lib/spotify';

function useSpotify() {
    const {data: session} = useSession()

    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshAccessTokenError') {
                signIn()
            }

            const accessToken = session?.user?.accessToken;
            if (!accessToken) {
                return
            }

            spotifyApi.setAccessToken(accessToken)
        }
    }, [session])

    return spotifyApi
}

export default useSpotify