import {getToken} from "next-auth/jwt";
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export async function middleware(req: NextRequest) {

    const token = await getToken({req, secret: process.env.JWT_SECRET})
    const {pathname} = req.nextUrl

    if (isPathAllowed(pathname) || token) {
        return NextResponse.next()
    }

    if (!token && pathname !== '/login') {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
}

function isPathAllowed(pathname: string) {
    const allowedPaths = [
        '/_next',
        '/api',
        'logo',
        'favicon'
    ]
    return allowedPaths.some(path => pathname.includes(path))
}