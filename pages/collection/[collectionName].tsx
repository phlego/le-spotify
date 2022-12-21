import type {NextPage} from 'next'
import Topbar from '../../components/Topbar'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'

const Collection: NextPage = () => {

    const router = useRouter()
    const collectionName = router.query.collectionName as string || ''

    const {data: session} = useSession()
    const user = session?.user
    if (!user) {
        return null
    }

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <Topbar user={user} isLibrary={true} />
            <h1 className="text-6xl text-white">{collectionName}</h1>
        </div>
    )
}

export default Collection
