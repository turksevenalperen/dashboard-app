import { NextRequest } from 'next/server';

const clients = new Map<string, { lastSeen: number }>();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = body.user;

  if (!user) {
    return new Response('User required', { status: 400 });
  }

  // Kullanıcının varlığını güncelle
  const client = clients.get(user);
  if (client) {
    client.lastSeen = Date.now();
  }

  return new Response('OK');
}
