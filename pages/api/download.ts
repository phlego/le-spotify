import type {NextApiRequest, NextApiResponse} from 'next'
import stream, {Readable} from 'stream'
import {promisify} from 'util'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const pipeline = promisify(stream.pipeline)
    res.setHeader('Content-Type', 'application/json')

    const fileStream = new Readable
    fileStream.push(req.body)
    fileStream.push(null)

    await pipeline(fileStream, res)
}
