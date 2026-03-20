import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const upstream = `https://submit-data.bodc.ac.uk/api/imagery-submissions${req.nextUrl.search}`

  const resp = await fetch(upstream, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  const data = await resp.text()

  return new NextResponse(data, {
    status: resp.status,
    headers: {
      'Content-Type': resp.headers.get('Content-Type') || 'application/json',
    },
  })
}
