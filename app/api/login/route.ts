import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePasswords } from '@/lib/hash';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePasswords(password, user.password))) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ user });
}
