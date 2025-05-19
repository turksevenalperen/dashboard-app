import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/hash'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password, name, position, department, phone, description } = body

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password required' }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
  }

  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      position,
      department,
      phone,
      description,
    },
  })

  return NextResponse.json({ user })
}
