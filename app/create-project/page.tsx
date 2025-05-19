// app/create-project/page.tsx
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function CreateProject() {
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  useEffect(() => {
    axios.get('/api/users').then(res => {
      setUsers(res.data)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post('/api/projects', {
      title,
      description,
      userIds: selectedUsers
    })
    router.push('/projects')
  }

  const toggleUser = (id: string) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Proje Başlığı"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border px-3 py-2"
        required
      />
      <textarea
        placeholder="Açıklama"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border px-3 py-2"
      />

      <div>
        <p className="font-semibold mb-2">Projede çalışacaklar:</p>
        {users.map((user: any) => (
          <label key={user.id} className="block">
            <input
              type="checkbox"
              value={user.id}
              checked={selectedUsers.includes(user.id)}
              onChange={() => toggleUser(user.id)}
            />
            <span className="ml-2">{user.name || user.email}</span>
          </label>
        ))}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Proje Oluştur
      </button>
    </form>
  )
}
