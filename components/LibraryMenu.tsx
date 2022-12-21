
function LibraryMenu() {
    return (
        <nav className="ml-8 text-white">
            <ul>
                <li className="inline-block cursor-pointer"><a
                    className="inline-block py-2 px-4 mr-2 rounded bg-black opacity-90 hover:opacity-80"
                    href="">Playlists</a></li>
                <li className="inline-block cursor-pointer"><a
                    className="inline-block py-2 px-4 mr-2"
                    href="">Podcasts</a></li>
                <li className="inline-block cursor-pointer"><a
                    className="inline-block py-2 px-4 mr-2"
                    href="">Artists</a></li>
                <li className="inline-block cursor-pointer"><a
                    className="inline-block py-2 px-4 mr-2"
                    href="">Albums</a></li>
            </ul>
        </nav>
    )
}

export default LibraryMenu