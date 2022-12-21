import NextAuth from "next-auth";
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, {LOGIN_URL} from "../../../lib/spotify";

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({token, account, user}) {

            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: millisToSeconds(account.expires_at),
                }
            }

            if (Date.now() < token.accessTokenExpires) {
                console.log('EXISTING ACCESS TOKEN IS VALID')
                return token;
            }

            console.log('ACCESS TOKEN EXPIRED. REFRESHING...')
            return refreshAccessToken(token)
        },
        async session({session, token}) {
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.username = token.username

            return session
        }
    }
})

async function refreshAccessToken(token) {
    try {
        const {accessToken, refreshToken} = token
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.setRefreshToken(refreshToken)

        const {body: refreshedToken} = await spotifyApi.refreshAccessToken()

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + millisToSeconds(refreshedToken.expires_in),
            refreshToken: refreshedToken.refresh_token ?? refreshToken
        }
    } catch (error) {
        console.error(error)
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

function millisToSeconds(millis) {
    return millis * 1000
}