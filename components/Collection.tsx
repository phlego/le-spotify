import {download} from '../lib/network'
import Topbar from './Topbar'
import {ArrowDownTrayIcon} from '@heroicons/react/24/outline'
import Card from './Card'

export interface CollectionItem {
    id: string
    url: string
    imageUrl: string
    title: string
    description: string
}

interface CollectionProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
    collectionName: string
    items: CollectionItem[]
}

const Collection = ({user, collectionName, items}: CollectionProps) => {

    function exportItems() {
        if (!items.length) return

        const collection = collectionName.toLowerCase()
        download(`${collection}.json`, {
            [collection]: items.map(({id, title}) => ({id, title})),
        })
    }

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <Topbar user={user} isLibrary={true}/>
            <section className="px-8">
                <div className="flex items-center my-4 text-white">
                    <h1 className="flex-grow text-2xl font-bold">{collectionName}</h1>
                    <button
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => exportItems()}
                    >
                        <h2>Export</h2>
                        <ArrowDownTrayIcon className="h-5 w-5"/>
                    </button>
                </div>
                <div
                    className="grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 xl:gap-x-6">
                    {items.map(({id, ...item}) => <Card key={id} {...item} />)}
                </div>
            </section>
        </div>
    )
}

export default Collection