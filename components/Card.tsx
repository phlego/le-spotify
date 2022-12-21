import Link from 'next/link'

interface CardProps {
    url: string
    imageUrl: string
    title: string
    description: string
}

function Card({url, imageUrl, title, description}: CardProps) {

    return (
        <Link href={url} className="group">
            <div
                className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img src={imageUrl}
                     alt=""
                     className="h-full w-full object-cover object-center group-hover:opacity-75"/>
            </div>
            <h3 className="mt-4 text-white font-bold whitespace-nowrap text-ellipsis overflow-hidden">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
        </Link>
    )
}

export default Card