import {download} from '../lib/network'
import Topbar from './Topbar'
import {ArrowDownTrayIcon, ArrowUpTrayIcon} from '@heroicons/react/24/outline'
import Card from './Card'
import ImportModal from './ImportModal'
import {useState} from 'react'

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
    fileImporter: (file: string) => void
}

const Collection = ({user, collectionName, items, fileImporter}: CollectionProps) => {

    const [open, setOpen] = useState(false)
    const collection = collectionName.toLowerCase()

    function importItems() {
        setOpen(true)
    }

    function exportItems() {
        if (!items.length) return

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
                        onClick={() => importItems()}
                    >
                        <h2>Import</h2>
                        <ArrowUpTrayIcon className="h-5 w-5"/>
                    </button>
                    <button
                        className="flex items-center space-x-2 ml-4 cursor-pointer"
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
            <ImportModal open={open} setOpen={setOpen} fileImporter={fileImporter} />
        </div>
    )
}

export default Collection