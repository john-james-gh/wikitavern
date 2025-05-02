import {NextResponse, type NextRequest} from "next/server"
import {globalMockState} from "@/lib/msw/global-mock-state"

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.featured) globalMockState.featuredOverride = body.featured
  if (body.recent) globalMockState.recentOverride = body.recent

  return NextResponse.json({data: body}, {status: 200})
}

export async function DELETE() {
  globalMockState.featuredOverride = null
  globalMockState.recentOverride = null
  return NextResponse.json({data: "Mocks reset"}, {status: 200})
}
