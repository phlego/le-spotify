import type {NextApiRequest, NextApiResponse} from 'next'

const fileImporters = {
    playlists: playlistImporter,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {collection, file} = JSON.parse(req.body)

    fileImporters[collection](file)

    return res.status(200).json({})
}

function playlistImporter(file) {
    console.log(JSON.stringify(file, null, 2))
}