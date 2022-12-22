import Link from 'next/link'
import {useRouter} from 'next/router'

const COLLECTIONS = [
    'Playlists',
    'Podcasts',
    'Artists',
    'Albums',
]

const ACTIVE_STYLES = 'rounded bg-gray-800 opacity-90 hover:opacity-80'

function LibraryMenu() {

    const router = useRouter()
    const currentPageName = router.query.collectionName as string || ''

    return (
        <nav className="ml-8 text-white">
            <ul>
                {COLLECTIONS.map(collectionName => {
                    const collectionPath = collectionName.toLowerCase()
                    const isActive = collectionPath === currentPageName
                    const activeStyles = isActive ? ACTIVE_STYLES : ''

                    return (
                        <li key={collectionPath} className="inline-block cursor-pointer">
                            <Link
                                className={`inline-block py-2 px-4 mr-2 ${activeStyles}`}
                                href={`/collection/${collectionPath}`}
                            >
                                {collectionName}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default LibraryMenu