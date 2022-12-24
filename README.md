# Le Spotify

An app I build to back up my Spotify collections (playlists, podcasts, artists and albums).

Built with Next.JS, Spotify API, Tailwind, NextAuth and Recoil.

To run this app, create a `.env.local` file at the root level and add the variables below.

```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_ID=<your_client_id>
NEXT_PUBLIC_CLIENT_SECRET=<your_client_secret>
JWT_SECRET=<your_secret>
```

Then simply run `npm run dev`

💡 **Notes**:
* You need to [register a Spotify developer account](https://developer.spotify.com/documentation/web-api/quick-start/) 
and create an app there to have your own ClientID and ClientSecret
* `JWT_SECRET` could be anything you like e.g. `OowfnWGIG23WWkv40EoVc`
* To export/import your collections, go to Your Library after running the app and login with your Spotify account