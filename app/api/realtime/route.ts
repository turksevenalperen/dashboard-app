import { NextRequest } from 'next/server';

const clients = new Map(); // userId => {res, lastSeen: number}

function sendActiveUsers() {
  const activeUsers = Array.from(clients.keys());
  const data = JSON.stringify({ type: 'users', users: activeUsers });
  const message = `data: ${data}\n\n`;

  for (const { controller } of clients.values()) {
    controller.enqueue(new TextEncoder().encode(message));
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const user = url.searchParams.get('user');
  if (!user) return new Response('User param required', { status: 400 });

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const write = (str: string) => {
        controller.enqueue(encoder.encode(str));
      };

      clients.set(user, { controller, lastSeen: Date.now() });

      write(`data: ${JSON.stringify({ type: 'users', users: Array.from(clients.keys()) })}\n\n`);

      const keepAlive = setInterval(() => write(':\n\n'), 15000);

      const checkInterval = setInterval(() => {
        const now = Date.now();
        for (const [u, client] of clients.entries()) {
          if (now - client.lastSeen > 30000) {
            clients.delete(u);
          }
        }
        sendActiveUsers();
      }, 10000);

      // Burada req.signal kullanıyoruz, controller.signal değil
      req.signal.addEventListener('abort', () => {
        clearInterval(keepAlive);
        clearInterval(checkInterval);
        clients.delete(user);
        sendActiveUsers();
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

