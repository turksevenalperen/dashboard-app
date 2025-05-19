import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { comparePasswords } from '@/lib/hash';
export const runtime = "nodejs"; // Bu satırı ekle


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'you@example.com',
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: '••••••••',
        },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        const isValid = await comparePasswords(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          department:user.department
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
