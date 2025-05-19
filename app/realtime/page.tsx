'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function RealtimePage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const user = session?.user?.name || 'Unknown';

    const eventSource = new EventSource(`/api/realtime?user=${encodeURIComponent(user)}`);

    eventSource.onopen = () => setConnected(true);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };

    eventSource.onerror = () => {
      setConnected(false);
      eventSource.close();
    };

    // Sayfa görünürlük değişimini backend'e bildir
    const sendHeartbeat = () => {
      // Her istekte sayfa aktif olduğunu bildir
      fetch('/api/realtime/heartbeat', { method: 'POST', body: JSON.stringify({ user }), headers: { 'Content-Type': 'application/json' } });
    };

    const intervalId = setInterval(sendHeartbeat, 10000); // 10 saniyede bir bildir

    // Sayfa aktiflik eventleri
    const handleVisibilityChange = () => {
      if (!document.hidden) sendHeartbeat();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    sendHeartbeat(); // sayfa açılır açılmaz bildir

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      eventSource.close();
    };
  }, [status, session]);

  if (status === 'loading') {
    return <div>Yükleniyor...</div>;
  }

  if (status !== 'authenticated') {
    return <div>Lütfen giriş yapınız.</div>;
  }

  return (
    <div>
      <h1>Aktif Kullanıcılar ({connected ? 'Online' : 'Offline'})</h1>
      <ul>
        {users.map(u => (
          <li key={u}>{u} {u === session.user?.name ? '(Sen)' : ''}</li>
        ))}
      </ul>
    </div>
  );
}
