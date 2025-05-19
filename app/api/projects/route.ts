// app/api/projects/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { title, description, userIds } = await req.json()

  const project = await prisma.project.create({
    data: {
      title,
      description,
      users: {
        connect: userIds.map((id: string) => ({ id }))
      }
    }
  })

  return NextResponse.json(project)
}
