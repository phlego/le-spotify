import {signOut} from 'next-auth/react'
import {ChevronDownIcon} from '@heroicons/react/24/outline'
import TopbarMenu from './TopbarMenu'

interface TopbarProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
    isLibrary?: boolean
}

function Topbar({user, isLibrary}: TopbarProps) {

    const position = isLibrary ? 'sticky bg-black' : 'absolute'

    return (
        <header className={`${position} top-0 right-0 left-0 flex space-x-4`}>
            <div className="flex-grow flex items-center">
                {isLibrary && <TopbarMenu />}
            </div>
            <div className="flex items-center">
                <div className="flex items-center bg-black space-x-2 m-4 opacity-90 hover:opacity-80
                                cursor-pointer rounded-full p-1 pr-2 bg-black text-white font-bold text-sm"
                     onClick={() => signOut()}
                >
                    {user.image && <img src={user.image} alt="avatar" className="rounded-full w-6 h-6"/>}
                    <h2>{user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </div>
        </header>
    )
}

export default Topbar